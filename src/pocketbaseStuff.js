import PocketBase from 'pocketbase';

// const pb = new PocketBase('http://127.0.0.1:8090');
const pb = new PocketBase('http://154.27.124.116:8090');

export async function logInAsAdmin () {
    return await pb.admins.authWithPassword('austinandrews89@gmail.com', 'TKE_by_1178');
}

//@ts-ignore
export async function logInAsUser (username, password) {
    return await pb.collection('users').authWithPassword(username, password);
}

export async function checkTheServer () {
    console.log("Checking for connection to PocketBase");
    const authData = await logInAsAdmin();
    
    

    const response = await pb.collection('users').getList(1, 20);
    console.log(response);
    console.log("Completed")
}