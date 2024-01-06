//@ts-nocheck
import PocketBase from 'pocketbase';
import { authedWritable } from './store';

let authedContent;
const unsub = authedWritable.subscribe((value) => authedContent = value);
unsub();


export async function initializePb() {
    let ip1 = "";
    let ip2 = "127.0.0.1"
    let ip3 = "10.0.0.145"
    if (authedContent.pocketIp) ip1 = authedContent.pocketIp;


    if (ip1) {
        let pb = await testPb(`http://${ip1}:8090`)
        if (pb === true) {
            return new PocketBase(`http://${ip1}:8090`)
        }
    }


    let pb = await (testPb(`http://${ip2}:8090`));
    if (pb === true) {
        authedWritable.update((ip2) => authedWritable.pocketIp = ip2);
        return new PocketBase(`http://${ip2}:8090`);
    }
    else pb = await (testPb(`http://${ip3}:8090`));
    if (pb === true) { 
        authedWritable.update((ip3) => authedWritable.pocketIp = ip3);
        return new PocketBase(`http://${ip3}:8090`);    
    }

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