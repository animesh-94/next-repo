export default function userProfile({params} : any){
    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-3">
                <div>User Profile</div>
                <div className="text-3xl">Profile Page <span className="px-2 rounded bg-orange-500 text-black">{params.id}</span></div>
            </div>
        </>
    );
}