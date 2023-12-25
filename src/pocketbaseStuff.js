//@ts-nocheck
import PocketBase from 'pocketbase';

export async function initializePb() {
    let pb = await (testPb('http://10.0.0.145:8090'));
    // console.log(pb)
    if (pb === true) return new PocketBase('http://10.0.0.145:8090');
    else pb = await (testPb('http://127.0.0.1:8090'));
    // console.log(pb)
    if (pb === true) return new PocketBase('http://127.0.0.1:8090');

    console.log("Error, all connections failed");
    return null;    
}

async function testPb(str) {

  try {
        const pb = new PocketBase(str);
        const user = await pb.collection('users').authWithPassword('Austin', '12345678');
        if (!user) return false;
        const data = await pb.collection('testAuth').getFullList({
            sort: 'created'
        });
        if (data) {
            pb.authStore.clear();
            return true;
        }
    } catch {
        return false;
    }
}

export async function logInAsAdmin () {
    const pb = await initializePb();
    if (pb === null) return null;
    return await pb.admins.authWithPassword('austinandrews89@gmail.com', 'TKE_by_1178');
}

//@ts-ignore
export async function logInAsUser (username, password) {
    const pb = await initializePb();
    if (pb === null) return null;
    return await pb.collection('users').authWithPassword(username, password);
}