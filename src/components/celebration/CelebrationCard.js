import React, { useContext, useEffect, useState } from "react"
import { Button } from "semantic-ui-react"
import { CelebrationContext } from "./CelebrationProvider"
import { useHistory } from "react-router-dom"
import { ImageContext } from "../image/ImageProvider"

export const CelebrationCard = ({ celebration }) => {
    const { removeCelebration } = useContext(CelebrationContext)
    const { getImageById } = useContext(ImageContext)

    const [image, setImage] = useState({})
    const history = useHistory()

    useEffect(() => {
        getImageById(celebration.imageId).then(setImage)
    }, [])

    return (
        <section className="celebration">
            <img src={image.image} style={{display: "block", height: "150px", width: "auto", marginRight: "auto", marginLeft: "auto"}}/>
            <h3 className="active_date">{celebration.name}</h3>
            <p>{celebration.about}</p>
            <Button type="button" onClick={() => {
                history.push(`/celebrations/edit/${celebration.id}`)
            }}>Edit</Button>
            <Button type="button" onClick={() => {
                removeCelebration(celebration.id)
            }}>Delete</Button>
        </section>
    )
}