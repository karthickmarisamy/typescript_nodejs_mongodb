import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        requried:true
    },
    email:{
        type:String,
        required: true
    },
    authentication:{
        password: { type: String, required:true, select:false},
        salt:{type:String, required: false, select:false},
        sessiontoken:{ type:String, required:false, select:false}
    }
})

export const userModel = mongoose.model("Users", userSchema);

export const getUsers = ( ) => userModel.find();
export const getUserName = (username :string) =>userModel.findOne({username})
export const getUserByEmail = (email: string) => userModel.findOne({email});
export const getUserBySession = (sessionToken: string) =>userModel.findOne({
    'authentication.sessiontoken' : sessionToken
});
export const getUserById = (id: string) =>userModel.findById({id});
export const createUser = (values: any) =>new userModel(values).save().then((user)=>user.toObject());
export const updateUser = (id: string, values: any) => userModel.findByIdAndUpdate(id, values);
export const deleteUser = (id: string) => userModel.findByIdAndDelete({_id:id});

