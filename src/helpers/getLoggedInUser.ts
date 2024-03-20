// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from '@/helpers/firebase';

// export const getCurrentUser = async () => {
//     try {
//         return new Promise((resolve, reject) => {
//             const unsubscribe = onAuthStateChanged(auth, (user) => {
//                 unsubscribe(); // Unsubscribe as soon as the user state changes
//                 if (user) {
//                     // User is signed in
//                     resolve(user);
//                 } else {
//                     // No user is signed in
//                     resolve(null); // You can also reject if needed
//                 }
//             }, (error) => {
//                 // Error occurred
//                 reject(error);
//             });
//         });
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// }
