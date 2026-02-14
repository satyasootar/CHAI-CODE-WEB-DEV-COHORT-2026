/**
 * 🔒 SecureApp Password Checker
 *
 * You're building the signup page for SecureApp, a new productivity tool.
 * The product manager wants a password strength meter that gives users
 * real-time feedback as they type their password.
 *
 * The checker evaluates 5 criteria:
 *   1. At least 8 characters long
 *   2. Contains at least one uppercase letter (A-Z)
 *   3. Contains at least one lowercase letter (a-z)
 *   4. Contains at least one number (0-9)
 *   5. Contains at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?) 
 *
 * Strength levels based on how many criteria are met:
 *   - 0–1 criteria → "weak"
 *   - 2–3 criteria → "medium"
 *   - 4 criteria   → "strong"
 *   - All 5        → "very strong"
 *
 * Rules:
 *   - Empty string → "weak"
 *   - Non-string input → "weak"
 *
 * @param {string} password - The password to evaluate
 * @returns {string} "weak", "medium", "strong", or "very strong"
 */
export function checkPasswordStrength(password) {

  function hasUpperCase(pass) {
    return /[A-Z]/.test(pass);
  }

  function hasLowerCase(pass) {
    return /[a-z]/.test(pass);
  }

  function hasNumber(pass){
     return /\d/.test(pass)
  }

  function hasSpecialChar(pass){
     return /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pass);
  }

  if(typeof password !== "string") {
   return "weak"
  }
  password = password.trim()

   if(password === ""){
    return "weak"
   }

   let criteriaNum = 0;

   if(password.length >= 8 ){
    criteriaNum ++
   }

   if(hasUpperCase(password)){
    criteriaNum += 1
   }

   if(hasLowerCase(password)){
    criteriaNum += 1
   }

   if(hasNumber(password)){
    criteriaNum += 1
   }

   if(hasSpecialChar(password)){
    criteriaNum += 1
   }

   if(criteriaNum === 5){
    return "very strong"
   }else if(criteriaNum === 4) {
    return "strong"
   } else if (criteriaNum >= 2){
    return "medium"
   }else {
     return "weak"
   }
}
