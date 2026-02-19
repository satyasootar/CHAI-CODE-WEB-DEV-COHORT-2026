"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const instructors = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    role: "Lead Instructor",
    bio: "My hallmark is making the toughest topics easy to understand, a skill that has earned me a dedicated following. I am committed to educating and inspiring a diverse audience worldwide, making complex subjects accessible and engaging.",
    profileImage: "https://pbs.twimg.com/profile_images/1724344976715468800/MasktpKz_400x400.jpg",
    largeImageBlack: "/hitesh-black.webp",
    largeImageWhite: "/hitesh-white.webp",
    logoDark: "data:image/svg+xml,%3csvg%20width='437'%20height='59'%20viewBox='0%200%20437%2059'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M54.6051%2058.8672V39.3033H23.3028V58.8672H1.18325e-05V0.00147775H23.3028V19.4785H54.6051V0.00147775H77.908V58.8672H54.6051ZM83.2588%2058.8672V0.00147775H106.562V58.8672H83.2588ZM136.702%2058.8672V21.3914H108.964V0.00147775H187.742V21.3914H159.918V58.8672H136.702ZM208.514%2058.8672C201.848%2058.8672%20197.008%2057.3021%20193.993%2054.1718C190.979%2051.0416%20189.472%2046.2303%20189.472%2039.738V13.305C189.472%209.01538%20190.544%205.74023%20192.689%203.47951C194.892%201.16082%20198.66%200.00147775%20203.993%200.00147775H256.337C261.612%200.00147775%20265.322%201.13184%20267.467%203.39256C269.67%205.65328%20270.771%208.95741%20270.771%2013.305V20.6088C270.771%2024.9564%20269.67%2028.2605%20267.467%2030.5212C265.322%2032.7819%20261.612%2033.9123%20256.337%2033.9123H212.862V37.3903H269.119V58.8672H208.514ZM247.381%2019.2176H212.862V22.6956H247.381V19.2176ZM275.371%2058.8672V39.3902H330.672V35.9122H289.718C284.443%2035.9122%20280.733%2034.7818%20278.588%2032.5211C276.444%2030.2024%20275.371%2026.8693%20275.371%2022.5217V13.305C275.371%208.95741%20276.444%205.65328%20278.588%203.39256C280.733%201.13184%20284.443%200.00147775%20289.718%200.00147775H352.41V19.2176H298.587V23.5652H339.454C344.729%2023.5652%20348.439%2024.7245%20350.584%2027.0432C352.786%2029.3039%20353.888%2032.608%20353.888%2036.9556V45.5637C353.888%2049.9113%20352.786%2053.2154%20350.584%2055.4761C348.439%2057.7368%20344.729%2058.8672%20339.454%2058.8672H275.371ZM412.904%2058.8672V39.3033H381.601V58.8672H358.299V0.00147775H381.601V19.4785H412.904V0.00147775H436.206V58.8672H412.904Z'%20fill='url(%23paint0_linear_1371_3104)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_1371_3104'%20x1='-1.7534'%20y1='30.8672'%20x2='457.244'%20y2='30.8672'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FEC48C'/%3e%3cstop%20offset='0.350962'%20stop-color='%23F77628'/%3e%3cstop%20offset='1'%20stop-color='%23CC4909'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
    logoLight: "data:image/svg+xml,%3csvg%20width='437'%20height='59'%20viewBox='0%200%20437%2059'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M54.6051%2058.8672V39.3033H23.3028V58.8672H1.18325e-05V0.00147775H23.3028V19.4785H54.6051V0.00147775H77.908V58.8672H54.6051ZM83.2588%2058.8672V0.00147775H106.562V58.8672H83.2588ZM136.702%2058.8672V21.3914H108.964V0.00147775H187.742V21.3914H159.918V58.8672H136.702ZM208.514%2058.8672C201.848%2058.8672%20197.008%2057.3021%20193.993%2054.1718C190.979%2051.0416%20189.472%2046.2303%20189.472%2039.738V13.305C189.472%209.01538%20190.544%205.74023%20192.689%203.47951C194.892%201.16082%20198.66%200.00147775%20203.993%200.00147775H256.337C261.612%200.00147775%20265.322%201.13184%20267.467%203.39256C269.67%205.65328%20270.771%208.95741%20270.771%2013.305V20.6088C270.771%2024.9564%20269.67%2028.2605%20267.467%2030.5212C265.322%2032.7819%20261.612%2033.9123%20256.337%2033.9123H212.862V37.3903H269.119V58.8672H208.514ZM247.381%2019.2176H212.862V22.6956H247.381V19.2176ZM275.371%2058.8672V39.3902H330.672V35.9122H289.718C284.443%2035.9122%20280.733%2034.7818%20278.588%2032.5211C276.444%2030.2024%20275.371%2026.8693%20275.371%2022.5217V13.305C275.371%208.95741%20276.444%205.65328%20278.588%203.39256C280.733%201.13184%20284.443%200.00147775%20289.718%200.00147775H352.41V19.2176H298.587V23.5652H339.454C344.729%2023.5652%20348.439%2024.7245%20350.584%2027.0432C352.786%2029.3039%20353.888%2032.608%20353.888%2036.9556V45.5637C353.888%2049.9113%20352.786%2053.2154%20350.584%2055.4761C348.439%2057.7368%20344.729%2058.8672%20339.454%2058.8672H275.371ZM412.904%2058.8672V39.3033H381.601V58.8672H358.299V0.00147775H381.601V19.4785H412.904V0.00147775H436.206V58.8672H412.904Z'%20fill='url(%23paint0_linear_1371_3094)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_1371_3094'%20x1='-1.7534'%20y1='30.8672'%20x2='457.244'%20y2='30.8672'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FDA652'/%3e%3cstop%20offset='0.350962'%20stop-color='%23F86C18'/%3e%3cstop%20offset='1'%20stop-color='%23AF3900'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
    socials: [
      {
        name: 'Youtube',
        url: 'https://www.youtube.com/@chaiaurcode',
        icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="size-5 text-neutral-700 hover:text-orange-500 dark:text-neutral-300 hover:dark:text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
      },
      {
        name: 'LinkedIn',
        url: 'http://linkedin.com/in/hiteshchoudhary',
        icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="size-4 text-neutral-700 hover:text-orange-500 dark:text-neutral-300 hover:dark:text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
      },
      {
        name: 'X',
        url: 'https://x.com/hiteshdotcom',
        icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="size-4 text-neutral-700 hover:text-orange-500 dark:text-neutral-300 hover:dark:text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
      },
      {
        name: 'Website',
        url: 'https://hitesh.ai',
        icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="size-4 text-neutral-700 hover:text-orange-500 dark:text-neutral-300 hover:dark:text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.78 3.653a3.936 3.936 0 1 1 5.567 5.567l-3.627 3.627a3.936 3.936 0 0 1-5.88-.353.75.75 0 0 0-1.18.928 5.436 5.436 0 0 0 8.12.486l3.628-3.628a5.436 5.436 0 1 0-7.688-7.688l-3 3a.75.75 0 0 0 1.06 1.061l3-3Z"></path><path d="M7.28 11.153a3.936 3.936 0 0 1 5.88.353.75.75 0 0 0 1.18-.928 5.436 5.436 0 0 0-8.12-.486L2.592 13.72a5.436 5.436 0 1 0 7.688 7.688l3-3a3.936 3.936 0 0 1-5.567-5.568l3.627-3.627Z"></path></svg>
      }
    ]
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    role: "Full Stack Instructor",
    bio: "My teaching style is hands-on, fast-paced, and focused on building real projects, not just theory. Whether you're just getting started or looking to deepen your skills, my goal is to make you confident and job-ready. See you in class.",
    profileImage: "https://pbs.twimg.com/profile_images/1991479533946695684/uL2HzvWv_400x400.jpg",
    largeImageBlack: "/piyush-black.webp", // Updated based on verification content
    largeImageWhite: "/piyush-white.webp", // Updated based on verification content
    logoDark: "data:image/svg+xml,%3csvg%20width='448'%20height='59'%20viewBox='0%200%20448%2059'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M23.303%2046.9549V58.8672H0.00016442V0.00147775H64.7785C70.0535%200.00147775%2073.7634%201.13184%2075.9082%203.39256C78.053%205.65328%2079.1254%208.95741%2079.1254%2013.305V32.5211C79.1254%2035.0716%2078.8646%2037.2744%2078.3429%2039.1294C77.8791%2040.9263%2077.0676%2042.4045%2075.9082%2043.5638C74.8069%2044.7232%2073.3287%2045.5927%2071.4737%2046.1724C69.6768%2046.6941%2067.445%2046.9549%2064.7785%2046.9549H23.303ZM55.9095%2019.2176H23.303V29.8256H55.9095V19.2176ZM82.0702%2058.8672V0.00147775H105.373V58.8672H82.0702ZM142.556%2058.8672V42.2596L106.732%200.00147775H136.469L154.468%2024.2608L172.467%200.00147775H200.987L165.859%2042.5204V58.8672H142.556ZM221.088%2058.8672C214.595%2058.8672%20209.813%2057.3021%20206.741%2054.1718C203.668%2050.9836%20202.132%2046.1724%20202.132%2039.738V0.00147775H225.609V37.3903H258.042V0.00147775H281.171V58.8672H221.088ZM286.24%2058.8672V39.3902H341.541V35.9122H300.587C295.312%2035.9122%20291.602%2034.7818%20289.457%2032.5211C287.313%2030.2024%20286.24%2026.8693%20286.24%2022.5217V13.305C286.24%208.95741%20287.313%205.65328%20289.457%203.39256C291.602%201.13184%20295.312%200.00147775%20300.587%200.00147775H363.279V19.2176H309.456V23.5652H350.323C355.598%2023.5652%20359.308%2024.7245%20361.453%2027.0432C363.655%2029.3039%20364.757%2032.608%20364.757%2036.9556V45.5637C364.757%2049.9113%20363.655%2053.2154%20361.453%2055.4761C359.308%2057.7368%20355.598%2058.8672%20350.323%2058.8672H286.24ZM423.773%2058.8672V39.3033H392.47V58.8672H369.168V0.00147775H392.47V19.4785H423.773V0.00147775H447.075V58.8672H423.773Z' fill='url(%23paint0_linear_1371_3097)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_1371_3097'%20x1='3.68117'%20y1='30.8672'%20x2='462.678'%20y2='30.8672'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FEC48C'/%3e%3cstop%20offset='0.350962'%20stop-color='%23F77628'/%3e%3cstop%20offset='1'%20stop-color='%23CC4909'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
    logoLight: "data:image/svg+xml,%3csvg%20width='448'%20height='59'%20viewBox='0%200%20448%2059'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M23.303%2046.9549V58.8672H0.00016442V0.00147775H64.7785C70.0535%200.00147775%2073.7634%201.13184%2075.9082%203.39256C78.053%205.65328%2079.1254%208.95741%2079.1254%2013.305V32.5211C79.1254%2035.0716%2078.8646%2037.2744%2078.3429%2039.1294C77.8791%2040.9263%2077.0676%2042.4045%2075.9082%2043.5638C74.8069%2044.7232%2073.3287%2045.5927%2071.4737%2046.1724C69.6768%2046.6941%2067.445%2046.9549%2064.7785%2046.9549H23.303ZM55.9095%2019.2176H23.303V29.8256H55.9095V19.2176ZM82.0702%2058.8672V0.00147775H105.373V58.8672H82.0702ZM142.556%2058.8672V42.2596L106.732%200.00147775H136.469L154.468%2024.2608L172.467%200.00147775H200.987L165.859%2042.5204V58.8672H142.556ZM221.088%2058.8672C214.595%2058.8672%20209.813%2057.3021%20206.741%2054.1718C203.668%2050.9836%20202.132%2046.1724%20202.132%2039.738V0.00147775H225.609V37.3903H258.042V0.00147775H281.171V58.8672H221.088ZM286.24%2058.8672V39.3902H341.541V35.9122H300.587C295.312%2035.9122%20291.602%2034.7818%20289.457%2032.5211C287.313%2030.2024%20286.24%2026.8693%20286.24%2022.5217V13.305C286.24%208.95741%20287.313%205.65328%20289.457%203.39256C291.602%201.13184%20295.312%200.00147775%20300.587%200.00147775H363.279V19.2176H309.456V23.5652H350.323C355.598%2023.5652%20359.308%2024.7245%20361.453%2027.0432C363.655%2029.3039%20364.757%2032.608%20364.757%2036.9556V45.5637C364.757%2049.9113%20363.655%2053.2154%20361.453%2055.4761C359.308%2057.7368%20355.598%2058.8672%20350.323%2058.8672H286.24ZM423.773%2058.8672V39.3033H392.47V58.8672H369.168V0.00147775H392.47V19.4785H423.773V0.00147775H447.075V58.8672H423.773Z' fill='url(%23paint0_linear_1378_3109)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_1378_3109'%20x1='3.68117'%20y1='30.8672'%20x2='462.678'%20y2='30.8672'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23FDA652'/%3e%3cstop%20offset='0.350962'%20stop-color='%23F86C18'/%3e%3cstop%20offset='1'%20stop-color='%23AF3900'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",
    socials: [
      {
        name: 'Youtube',
        url: 'https://www.youtube.com/@piyushgargdev',
        icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="size-5 text-neutral-700 hover:text-orange-500 dark:text-neutral-300 hover:dark:text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/piyushgarg195/',
        icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="size-4 text-neutral-700 hover:text-orange-500 dark:text-neutral-300 hover:dark:text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
      },
      {
        name: 'X',
        url: 'https://x.com/piyushgarg_dev',
        icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="size-4 text-neutral-700 hover:text-orange-500 dark:text-neutral-300 hover:dark:text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
      },
      {
        name: 'Website',
        url: 'https://www.piyushgarg.dev',
        icon: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="size-4 text-neutral-700 hover:text-orange-500 dark:text-neutral-300 hover:dark:text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14.78 3.653a3.936 3.936 0 1 1 5.567 5.567l-3.627 3.627a3.936 3.936 0 0 1-5.88-.353.75.75 0 0 0-1.18.928 5.436 5.436 0 0 0 8.12.486l3.628-3.628a5.436 5.436 0 1 0-7.688-7.688l-3 3a.75.75 0 0 0 1.06 1.061l3-3Z"></path><path d="M7.28 11.153a3.936 3.936 0 0 1 5.88.353.75.75 0 0 0 1.18-.928 5.436 5.436 0 0 0-8.12-.486L2.592 13.72a5.436 5.436 0 1 0 7.688 7.688l3-3a3.936 3.936 0 0 1-5.567-5.568l3.627-3.627Z"></path></svg>
      }
    ]
  }
];

export function Instructors() {
  const [activeIndex, setActiveIndex] = useState(0); 
  const activeInstructor = instructors[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % instructors.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-16 mb-8 flex w-full flex-col justify-center sm:mt-36 sm:items-center">
      <h2 className="text-[28px] font-light text-neutral-900 sm:text-center sm:text-4xl md:text-5xl dark:text-neutral-100">
        Meet my <span className="font-montserrat font-medium tracking-tight text-yellow-800 capitalize dark:text-orange-100">Instructors</span>
      </h2>
      <p className="mt-1 mb-3 max-w-4xl font-onest font-light sm:mt-5 sm:mb-10 sm:text-center sm:text-xl">
        Learning from <span className="font-medium">Industry Veterans</span> and <span className="font-medium">Guest Experts</span> who bring real-world experience<span className="max-sm:hidden"> to the classroom. Our instructors are passionate about teaching and committed to your success</span>.
      </p>
      
      <div className="flex w-full max-w-4xl flex-col md:flex-row md:gap-8 lg:gap-12">
        {/* Left Side: Desktop Controls & Info */}
        <div className="hidden flex-col justify-end pt-4 pb-8 md:flex md:flex-1">
          {/* Avatar Toggles */}
          <div className="flex-1 flex items-center">
            {instructors.map((inst, index) => (
              <button 
                key={inst.id}
                onClick={() => setActiveIndex(index)}
                className={`size-20 cursor-pointer rounded-full ring-offset-2 transition-all duration-300 dark:ring-offset-black relative outline-none focus:ring-2 focus:ring-orange-500 ${
                  activeIndex === index 
                    ? "scale-110 ring-1 ring-orange-300 dark:ring-amber-700 z-10" 
                    : "opacity-60 hover:opacity-90 z-0 hover:z-20"
                } mr-[-20px] last:mr-0`}
                type="button"
                aria-label={`Select ${inst.name}`}
              >
                <img 
                  className="size-full rounded-full object-cover pointer-events-none" 
                  alt={`${inst.name} profile`} 
                  src={inst.profileImage} 
                />
              </button>
            ))}
          </div>

          {/* Instructor Info */}
          <div className="space-y-6">
            <h2 className="mb-4 font-onest text-3xl font-medium tracking-tight text-gray-900 lg:text-4xl dark:text-white">
              {activeInstructor.name}
            </h2>
            <p className="text-base leading-relaxed text-gray-700 lg:text-lg dark:text-gray-300">
              {activeInstructor.bio}
            </p>
            <div className="flex items-center gap-4">
              {activeInstructor.socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex size-10 items-center justify-center rounded-full bg-neutral-50 transition-colors hover:bg-transparent dark:bg-neutral-900 hover:dark:bg-transparent" 
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: 3D Card Image */}
        <div className="flex justify-center md:justify-end">
          <div>
            <div className="pt-4 pb-8 flex items-center justify-center" style={{ perspective: "1000px" }}>
              <div 
                className="flex items-center justify-center relative transition-all duration-200 ease-linear !p-0" 
                style={{ transformStyle: "preserve-3d", transform: "rotateY(0deg) rotateX(0deg)" }}
              >
                <div className="h-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d] group/card relative w-full cursor-pointer rounded-xl border-0 border-black/[0.1] bg-black p-0 max-sm:h-[450px] sm:h-[400px] sm:w-[300px] dark:border-white/[0.15] dark:bg-white">
                  <div className="w-fit transition duration-200 ease-linear absolute top-3 left-2 text-xs text-white dark:text-neutral-600" style={{ transform: "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)" }}>
                    <div className="z-10 flex items-center gap-1.5 p-3 font-montserrat text-xs font-medium select-none">
                    </div>
                  </div>
                  
                  {/* Large Image Container */}
                  <div className="transition duration-200 ease-linear relative flex size-full items-center justify-center overflow-hidden rounded-xl" style={{ transform: "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)" }}>
                    <div className="absolute bottom-0 z-50 h-1/2 w-full bg-gradient-to-b dark:from-[#1110] dark:to-[#000] from-white/0 to-orange-50"></div>
                    <img 
                      alt={activeInstructor.name} 
                      className="hidden transition-opacity duration-500 dark:flex scale-[140%] ml-8 mt-12" 
                      draggable="false" 
                      src={activeInstructor.largeImageBlack} 
                    />
                    <img 
                      alt={activeInstructor.name} 
                      className="transition-opacity duration-500 dark:hidden scale-[140%] ml-8 mt-12" 
                      draggable="false" 
                      src={activeInstructor.largeImageWhite} 
                    />
                  </div>

                  {/* Logo / Title overlay */}
                  <div className="w-fit transition duration-200 ease-linear absolute bottom-10 mx-auto flex flex-col-reverse px-6 text-center" style={{ transform: "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)" }}>
                    <img className="hidden dark:flex" draggable="false" alt={`${activeInstructor.name} logo`} src={activeInstructor.logoDark} />
                    <img className="dark:hidden" draggable="false" alt={`${activeInstructor.name} logo`} src={activeInstructor.logoLight} />
                    <p className="z-10 mb-1 font-montserrat text-orange-900 dark:text-orange-100">{activeInstructor.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View: Bottom Controls */}
        <div className="z-1 mx-auto -mt-12 flex flex-col items-center justify-center gap-4 rounded-xl bg-orange-50 px-8 pb-4 sm:hidden dark:bg-black">
          <div className="relative flex items-center gap-6">
             {activeInstructor.socials.map((social) => (
                <a 
                  key={social.name}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center" 
                  aria-label={social.name}
                >
                  {/* Styling for mobile icons slightly different in snippet, adjusting size */}
                  <span className="*:size-[26px] *:text-neutral-700 *:hover:text-orange-500 *:dark:text-neutral-300 *:hover:dark:text-orange-400">
                    {social.icon}
                  </span>
                </a>
              ))}
            
            {/* Mobile Dots */}
            <div className="absolute -bottom-10 z-2 flex w-full transform justify-center gap-1.5 sm:hidden">
              {instructors.map((_, index) => (
                <button 
                  key={index}
                  type="button" 
                  onClick={() => setActiveIndex(index)}
                  className={`size-2 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? "w-4 bg-orange-500 dark:bg-orange-400" 
                      : "bg-neutral-300 hover:bg-orange-300 dark:bg-neutral-600"
                  }`} 
                  aria-label={`View instructor ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
