import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import {useDispatch} from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from "react-router-dom";

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const response = await axios.post("/api/auth/google", {
                userName: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            },{
                headers:{
            "Content-Type":"application/json",
          },
            });
            const data = response.data;
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <button
      className="bg-gray-700 text-white p-3 rounded-lg hover:opacity-90 transition uppercase disabled:opacity-50"
      type="button"
      onClick={handleGoogleClick}
    >
      Google
    </button>
  );
};

export default OAuth;
