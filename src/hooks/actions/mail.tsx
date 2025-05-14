import apiClient from "@/axios";


export const sendMail = async ({email, question}:{email:string,question:string}) => {
    const data = { email, question };
    const response =await apiClient.post("/feedback/create", data);
    return response.data;
};
