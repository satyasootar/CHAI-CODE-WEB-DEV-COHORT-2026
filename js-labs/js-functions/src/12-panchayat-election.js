/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  const votes = {};       
  const registeredVoters = new Map();   
  const votedVoters = new Set();        

  candidates.forEach((c) => {
    votes[c.id] = 0;
  });
  function isValidVoter(voter) {
    return (
      voter !== null &&
      typeof voter === "object" &&
      voter.id &&
      voter.name &&
      typeof voter.age === "number"
    );
  }

  function candidateExists(candidateId) {
    return candidates.some((c) => c.id === candidateId);
  }

  return {
    registerVoter(voter) {
      if (!isValidVoter(voter)) return false;
      if (voter.age < 18) return false;
      if (registeredVoters.has(voter.id)) return false;

      registeredVoters.set(voter.id, voter);
      return true;
    },

    castVote(voterId, candidateId, onSuccess, onError) {
      if (!registeredVoters.has(voterId)) {
        return onError("Voter not registered");
      }
      if (!candidateExists(candidateId)) {
        return onError("Candidate does not exist");
      }
      if (votedVoters.has(voterId)) {
        return onError("Voter has already voted");
      }
      votes[candidateId]++;
      votedVoters.add(voterId);

      return onSuccess({ voterId, candidateId });
    },

    getResults(sortFn) {
      const results = candidates.map((c) => ({
        id:    c.id,
        name:  c.name,
        party: c.party,
        votes: votes[c.id],
      }));
      if (sortFn) {
        return results.sort(sortFn);
      }

      return results.sort((a, b) => b.votes - a.votes);
    },

    getWinner() {
      const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
      if (totalVotes === 0) return null;
      const results = this.getResults();  
      return results[0];
    },
  };
}

export function createVoteValidator(rules) {

  return function (voter) {

    for (const field of rules.requiredFields) {
      if (!voter || voter[field] === undefined || voter[field] === null) {
        return { valid: false, reason: `Missing required field: ${field}` };
      }
    }

    if (typeof voter.age !== "number") {
      return { valid: false, reason: "Age must be a number" };
    }

    if (voter.age < rules.minAge) {
      return { valid: false, reason: `Age must be at least ${rules.minAge}` };
    }

    return { valid: true, reason: null };
  };
}

export function countVotesInRegions(regionTree) {
  if (!regionTree || typeof regionTree !== "object") return 0;

  const currentVotes = typeof regionTree.votes === "number"
    ? regionTree.votes
    : 0;
  if (!Array.isArray(regionTree.subRegions) || regionTree.subRegions.length === 0) {
    return currentVotes;
  }

  const subVotes = regionTree.subRegions.reduce((total, sub) => {
    return total + countVotesInRegions(sub);   
  }, 0);

  return currentVotes + subVotes;
}

export function tallyPure(currentTally, candidateId) {
  return {
    ...currentTally,
    [candidateId]: (currentTally[candidateId] || 0) + 1,
  };
}