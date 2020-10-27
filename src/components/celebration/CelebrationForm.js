import React, { useContext, useState, useEffect } from "react"
import { CelebrationContext } from "./CelebrationProvider"
import { useParams, useHistory } from "react-router-dom"
import { Button } from "semantic-ui-react"
import { ImageContext } from "../image/ImageProvider"

export const CelebrationForm = () => {
    const { addCelebration, updateCelebration, getCelebrationById } = useContext(CelebrationContext)
    const { addImage, getImageById } = useContext(ImageContext)

    const [celebration, setCelebration] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [image, setImage] = useState("")
    
    const history = useHistory()
    const params = useParams()


    useEffect(() => {
        if (params.celebrationId) {
            getCelebrationById(params.celebrationId)
            .then(celebration => {
                setCelebration(celebration)
                params.celebrationDate = celebration.date
                setIsChecked(!celebration.isYearly)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        if (celebration.imageId) {
            getImageById(celebration.imageId).then(res => {
                setImage(res)
                setIsLoading(false)
            })
        }
    }, [celebration])

    const handleControlledInputChange = event => {
        const newCelebration = { ...celebration }
        newCelebration[event.target.name] = event.target.value
        setCelebration(newCelebration)
    }

    const constructCelebrationObject = () => {
        setIsLoading(false);
        if (params.celebrationId) {
            updateCelebration({
                id: celebration.id,
                name: celebration.name,
                date: celebration.date,
                reminderStartDate: celebration.reminderStartDate,
                about: celebration.about,
                imageId: image.id,
                isYearly: !isChecked,
                userId: parseInt(localStorage.getItem("cs_user"))
            })
            .then(() => history.push(`/celebrations/list/${celebration.date}`))
        } else {
            addCelebration({
                name: celebration.name,
                date: celebration.date,
                reminderStartDate: celebration.reminderStartDate,
                about: celebration.about,
                imageId: image.id,
                isYearly: !isChecked,
                userId: parseInt(localStorage.getItem("cs_user"))
            })
            .then(() => history.push(`/celebrations/list/${celebration.date}`))
        }
    }

    const uploadImage = async e => {
        const files = e.target.files[0]
        const data = new FormData()
        data.append("file", files)
        data.append("upload_preset", "capstone-images")
        setIsLoading(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/blaker814/image/upload", {
            method: "POST",
            body: data
        })

        const file = await res.json()

        const imageObj = await addImage({
            image: file.secure_url,
            custom: true,
            userId: parseInt(localStorage.getItem("cs_user"))
        })

        setImage(imageObj)
        setIsLoading(false)
    }

    return (
        <form className="celebrationForm" onSubmit={evt => {
            evt.preventDefault() // Prevent browser from submitting the form
            constructCelebrationObject()
        }}>
            <h2 className="celebrationForm__title">
                {params.celebrationId ? "Update Celebration" : "New Celebration"}
            </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="celebrationName">Celebration name: </label>
                    <input type="text" id="celebrationName" name="name" required autoFocus 
                    className="form-control" placeholder="Celebration name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={celebration.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of celebration: </label>
                    <input type="date" id="date" name="date" required 
                    className="form-control" placeholder="Date of celebration" 
                    min={new Date(Date.now() - 18000000).toISOString().split("T")[0]}
                    onChange={handleControlledInputChange} 
                    defaultValue={params.date? params.date : celebration.date} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="checkbox" name="isYearly" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <label htmlFor="isYearly"> One-time celebration</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reminderStartDate">Celebration reminder start date: </label>
                    <input type="date" id="reminderStartDate" name="reminderStartDate" required 
                    className="form-control" placeholder="Celebration reminder start date" 
                    min={new Date(Date.now() - 18000000).toISOString().split("T")[0]}
                    onChange={handleControlledInputChange} 
                    defaultValue={celebration.reminderStartDate} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="about">About: </label>
                    <input type="text" id="about" name="about" required
                    className="form-control" placeholder="Information about celebration" 
                    onChange={handleControlledInputChange} 
                    defaultValue={celebration.about}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="file">Upload celebration image</label><br />
                    <input type="file" name="file" onChange={uploadImage} defaultValue={image.image}/>
                    {isLoading ? <h3>Loading...</h3> : <img src={image.image} style={{width: "300px"}} />}
                </div>
            </fieldset>
            <Button type="submit"
                disabled = {isLoading}
                className="btn btn-primary">
                {params.celebrationId ? "Save Celebration" : "Add Celebration"}
            </Button>
            <Button type="button" onClick={() => {
                params?.date ? history.push(`/celebrations/list/${params.date}`) : params?.celebrationId ? history.push(`/celebrations/list/${params.celebrationDate}`) : history.push("/celebrations")
            }}>Cancel</Button>
        </form>
    )
}