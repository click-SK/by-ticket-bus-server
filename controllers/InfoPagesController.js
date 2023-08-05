import AboutUsModel from "../models/AboutUs.js";
import ContactsUsModel from "../models/ContactsUs.js";
import PolicyModel from "../models/Policy.js";
import TravelRulesModel from "../models/TravelRules.js";

export const addNewPageInfo = async (req,res) => {
    try{
        const {descriptionSp, descriptionEn} = req.body;

        const post = await TravelRulesModel.create({
            descriptionSp,
            descriptionEn
        })

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const updateAboutUs = async (req,res) => {
    try{
        const {descriptionSp, descriptionEn, id} = req.body;

        console.log('descriptionSp',descriptionSp);
        console.log('descriptionEn',descriptionEn);
        console.log('id',id);

        const post = await AboutUsModel.findById(id);

        console.log('post',post);

        post.descriptionEn = descriptionEn;
        post.descriptionSp = descriptionSp;

        await post.save();

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const getAboutUs = async (req,res) => {
    try{
        const post = await AboutUsModel.find();

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const updateContactsUs = async (req,res) => {
    try{
        const {descriptionSp, descriptionEn, id} = req.body;

        const post = await ContactsUsModel.findById(id);

        post.descriptionEn = descriptionEn;
        post.descriptionSp = descriptionSp;

        await post.save();

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}
export const getContactsUs = async (req,res) => {
    try{
        const post = await ContactsUsModel.find();

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const updatePolicy = async (req,res) => {
    try{
        const {descriptionSp, descriptionEn, id} = req.body;

        const post = await PolicyModel.findById(id);

        post.descriptionEn = descriptionEn;
        post.descriptionSp = descriptionSp;

        await post.save();

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const getPolicy = async (req,res) => {
    try{
        const post = await PolicyModel.find();

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const updateTravelRules = async (req,res) => {
    try{
        const {descriptionSp, descriptionEn, id} = req.body;

        const post = await TravelRulesModel.findById(id);

        post.descriptionEn = descriptionEn;
        post.descriptionSp = descriptionSp;

        await post.save();

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}

export const getTravelRules = async (req,res) => {
    try{
        const post = await TravelRulesModel.find();

        res.json(post)
    } catch(e) {
        console.log(e);
    }
}