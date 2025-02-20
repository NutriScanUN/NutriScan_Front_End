const signInWithEmailAndPassword = (a:string,b:string) => {
    console.log("🚀 ~ signInWithEmailAndPassword ~ a:", a)
    console.log("🚀 ~ signInWithEmailAndPassword ~ b:", b)
    return true
}
const createUserWithEmailAndPassword = (a:string,b:string,data:object) => {
    console.log("🚀 ~ createUserWithEmailAndPassword ~ data:", data)
    console.log("🚀 ~ createUserWithEmailAndPassword ~ b:", b)
    console.log("🚀 ~ createUserWithEmailAndPassword ~ a:", a)
    return true
}

export {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,

}