export const mapIndividualUserData = (userDetails)=>{
    const   profile_status = (userDetails.user_type === 'i-customer') ? 'Active' : 'Pending'
    let mapped = {
        user:{
            email:userDetails.email, 
            password:userDetails.password,
            user_type:userDetails.user_type,
            profile_status,
        },
        profile:{
            first_name:userDetails.first_name, 
            middle_name:userDetails.middle_name, 
            last_name:userDetails.last_name, 
            gender:userDetails.gender, 
            mobile:userDetails.mobile, 
            province:userDetails.province, 
            city:userDetails.city,
            area:userDetails.area,
            },
        }
        if (userDetails.user_type === 'i-caterer'){
            const profile = {...mapped.profile, id_type:null, id_number:null, id_photo:null, service:[""]}
            mapped = {...mapped, profile}
        }
        else{
            const profile = {...mapped.profile}
            mapped = {...mapped, profile}
        }
        return mapped;
}
export const mapBusinessUserData = (userDetails)=>{
    const   profile_status = (userDetails.user_type === 'i-customer') ? 'Active' : 'Pending'
    let mapped = {
        user:{
            email:userDetails.email, 
            password:userDetails.password,
            user_type:userDetails.user_type,
            profile_status,
        },
        profile:{
            name_of_business:userDetails.name_of_business, 
            type_of_business:userDetails.type_of_business, 
            person_to_contact:userDetails.person_to_contact, 
            person_phone:userDetails.person_phone, 
            province:userDetails.province, 
            city:userDetails.city,
            area:userDetails.area,
            },
        }
        if (userDetails.user_type === 'b-caterer'){
            const profile = {...mapped.profile, registration_no:null, document_photo:null, service:[""]}
            mapped = {...mapped, profile}
        }
        else{
            const profile = {...mapped.profile, registration_no:null, document_photo:null}
            mapped = {...mapped, profile}
        }
        return mapped;
}

export const mapIndividualUserProfileData = (userDetails, userType)=>{
    if (userType){
        userDetails.user_type = userType
    }
    let mapped = {
        user:{
            email:userDetails.email,
        },
        profile:{
            first_name:userDetails.first_name, 
            middle_name:userDetails.middle_name, 
            last_name:userDetails.last_name,
            profile_picture:userDetails.profile_picture, 
            gender:userDetails.gender, 
            mobile:userDetails.mobile, 
            province:userDetails.province, 
            city:userDetails.city,
            area:userDetails.area,
            },
        }
        if (userDetails.user_type === 'i-caterer'){
            const profile = {...mapped.profile, id_type:userDetails.id_type, id_number:userDetails.id_number, id_photo:userDetails.id_photo, services:userDetails.services}
            mapped = {...mapped, profile}
        }
        return mapped;
}
export const mapBusinessUserProfileData = (userDetails, userType)=>{
    if (userType){
        userDetails.user_type = userType
    }
    let mapped = {
        user:{
            email:userDetails.email,
        },
        profile:{
            name_of_business:userDetails.name_of_business,
            profile_picture:userDetails.profile_picture,
            person_to_contact:userDetails.person_to_contact,
            person_phone:userDetails.person_phone,
            province:userDetails.province, 
            city:userDetails.city, 
            area:userDetails.area,
            document_photo:userDetails.document_photo,
            registration_no:userDetails.registration_no,
            },
        }
        if (userDetails.user_type === 'b-customer'){
            const profile = {...mapped.profile, type_of_business:userDetails.type_of_business}
            mapped = {...mapped, profile}
        }
        else {
            const profile = {...mapped.profile,  services:userDetails.services}
            mapped = {...mapped, profile}
        }
        return mapped;
}