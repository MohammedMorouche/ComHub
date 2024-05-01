
import MainHeader from "./MainHeader";

function Header() {
//   function GetCurrentUser(){
//     const [user, setUser]=useState(null);
//     useEffect(()=>{
//         onAuthStateChanged(auth,user=>{
//             if(user){
//                 fs.collection('users').doc(user.uid).get().then(snapshot=>{
//                     setUser(snapshot.data().FullName);
//                 })
//             }
//             else{
//                 setUser(null);
//             }
//         })
//     },[])
//     return user;
// }

// const user = GetCurrentUser();
// console.log(user);
    return (
        <>
            <MainHeader />
        </>
    );
}

export default Header;
