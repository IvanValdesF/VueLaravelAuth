export default async function auth({ store, redirect }) {
  
  console.log("asd")
  if (!store.getters["Auth/authUser"]) {
    await store.dispatch("Auth/getAuthUser").then(() => {
      if (!store.getters["Auth/authUser"]){
        redirect('/login');
      } 
      
    });
  } 
}
