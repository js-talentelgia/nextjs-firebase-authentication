export default function userProfile({params}: any){
    return (<div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>User Profile</h1>
        <p>User id <span className="p-1 ml-1 bg-orange-500">{params.id}</span></p>
    </div>)
}