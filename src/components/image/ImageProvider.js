import React, { useState, createContext } from "react"

export const ImageContext = createContext()

export const ImageProvider = (props) => {
    const [images, setImages] = useState([])

    const getImages = () => {
        return fetch("http://localhost:8088/images")
            .then(res => res.json())
            .then(setImages)
    }

    const getImageById = id => {
        return fetch(`http://localhost:8088/images/${id}`)
            .then(res => res.json())
    }

    const addImage = image => {
        return fetch(`http://localhost:8088/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(image)
        })
        .then(res => res.json())
    }

    return (
        <ImageContext.Provider value={{
            images, getImages, getImageById, addImage
        }}>
            {props.children}
        </ImageContext.Provider>
    )
}