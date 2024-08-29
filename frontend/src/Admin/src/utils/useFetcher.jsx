import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (URL,requestOptions={}) =>{
    const [data,setData] =useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const [errorMessage,setErrorMessage] = useState("")
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await fetch(URL,requestOptions)
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                console.log(response);
                
                setData(response.data)
                setIsLoading(false)
            } catch (error) {
                setErrorMessage(error.message)
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()
    },[URL])
    return {data,isLoading,errorMessage}
}
export default useFetch