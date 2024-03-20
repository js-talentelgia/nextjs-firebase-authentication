// import admin from "firebase-admin";
// import { promises as fs } from 'fs';

// try {
//     // Check if the app has already been initialized
//     if (!admin.apps.length) {
//         const file = await fs.readFile(process.cwd() + '/src/nextjs-admin.json', 'utf8');
//         const data = JSON.parse(file);
//         admin.initializeApp({
//             credential: admin.credential.cert(data),
//         });
//     }
// } catch (error: any) {
//     throw new Error(error.message);    
// }

// export default admin;
