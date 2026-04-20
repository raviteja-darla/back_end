const express = require("express");

const userFollowSchema = new mongoose.Schema({

    follower: {
        type: String
    },
    followee: {
        type: String
    }

}, { timestamp: true })

userFollowSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("follow", userFollowSchema);

module.exports = followModel;