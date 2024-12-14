import { signOut } from "firebase/auth";
import { auth } from "../../../componets/config/firebaseConfig";

export default signOut(auth).then(() => {
        // Sign-out successful.
        localStorage.removeItem("user"); // Clear user data from localStorage
        window.location.reload(); // Reload to reflect the logout
      }).catch((error) => {
        // An error happened.
      });
   
