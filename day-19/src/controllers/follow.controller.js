const followModel = require("./../model/follow.model")

const userModel = require("./../model/users.model");

async function followController (req, res) {
    try {
        const followerUsername = req.user.username;
        const followeeUsername = req.params.username; 
    
        const is_user_exist = await userModel.findOne({
            username: followeeUsername
        })
    
        if( !is_user_exist ) return res.status(404).json({ message: "User you are trying to follow does not exist" })
    
        if( followerUsername === followeeUsername) return res.status(403).json({ message: "You can't follow your self" }); 
    
        const is_already_following = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        })
    
        if( is_already_following ) return res.status(409).json({ message: "You are already following this user", follow: is_already_following })
    
        const setFollow = await followModel.create({
            follower: followerUsername,
            followee: followeeUsername
        });
    
        return res.status(201).json({ message: `You have started following ${followeeUsername}`, follow: setFollow })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", err: err.message })
    }
};

async function unfollowController (req, res) {
    
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const is_user_following = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if( !is_user_following ) {
        return res.status(404).jons({
            message: "your not following",
            follow: is_user_following
        });
    }

    await followModel.findByIdAndDelete( is_user_following._id );

    res.status(201).json({
        message: `You've unfollowed ${followeeUsername}`
    })
};

module.exports = {
    followController,
    unfollowController
}

