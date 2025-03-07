import User from '../model/userModel.js';

export const createUser = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        if (!name ||!email ||!password ||!role) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists.' });
        }
        const user = new User({ name, email, password, role });
        await user.save();
        res.status(201).json(user);
        console.log('User created successfully:', user);        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating user.' });
    } 
}  



export const fetch = async (req,res)  => { 
    try {
        const data = await User.find();
        if(!data.length) {
            return res.status(404).json({ error: 'No data found.' });
        }   
       return res.status(200).json( { message: 'Data fetched successfully!',data}  );
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}; 

export const update = async (req, res) => { 
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Please provide a user ID.' });
        }
        const user = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully!', user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while updating user.' });
    }
};


export const remove = async (req, res) => { 
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Please provide a user ID.' });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while deleting user.' });
    }
};