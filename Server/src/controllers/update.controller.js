import User from "../models/user.js";
import uploadToCloudinary from "../utils/uploadCloudinary.js";

export const updateProfile = async (req, res) => {
    try {
        const { userName } = req.body;

        const updateData = {};

        if (userName) {
            updateData.userName = userName;
        }

        if (req.files?.profilePhoto?.[0]) {
            const result = await uploadToCloudinary(
                req.files.profilePhoto[0].buffer
            );

            updateData.profilePhoto = result.secure_url;
        }

        if (req.files?.bgPhoto?.[0]) {
            const result = await uploadToCloudinary(
                req.files.bgPhoto[0].buffer
            );

            updateData.bgPhoto = result.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("profile update error:", error);
        res.status(500).json({
            message: "failed to update profile"
        });
    }
};