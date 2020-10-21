import React, { useState, useContext, useEffect } from "react"
import { Input, Button, Icon } from "semantic-ui-react"
import { useHistory, useParams } from "react-router-dom"
import { GiftContext } from "./GiftProvider"
import { CelebrationContext } from "../celebration/CelebrationProvider"

export const GiftForm = () => {    
    const { getGiftById, updateGift, addGift } = useContext(GiftContext)
    const { getCelebrations, celebrations } = useContext(CelebrationContext)

    const [gift, setGift] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory()
    const params = useParams({})

    useEffect(() => {
        getCelebrations()
        .then(() => {
            if (params.giftId) {
                getGiftById(params.giftId)
                .then(gift => {
                    setGift(gift)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const handleControlledInputChange = event => {
        const newGift = { ...gift }
        newGift[event.target.name] = event.target.value
        setGift(newGift)
    }

    const constructGiftObject = () => {
        setIsLoading(false);
        if (params.giftId) {
            updateGift({
                id: gift.id,
                gift: gift.gift,
                price: gift.price,
                purchased: gift.purchased,
                celebrationId: gift.celebrationId,
                giftListId: gift.giftListId
            })
            .then(() => history.push(`/gifts/table/${params.tableId}`))
        } else {
            addGift({
                gift: gift.gift,
                price: gift.price,
                purchased: gift.purchased,
                celebrationId: gift.celebrationId,
                giftListId: gift.giftListId
            })
            .then(() => history.push(`/gifts/table/${params.tableId}`))
        }
    }

    return (
        <div>
            <form className="giftForm" onSubmit={evt => {
                evt.preventDefault() // Prevent browser from submitting the form
                constructGiftObject()
            }}>
                <h2 className="giftForm__title">
                    {params.giftId ? "Update gift" : "New gift"}
                </h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="giftName">Name of gift </label>
                        <input type="text" id="giftName" name="gift" required autoFocus 
                        className="form-control" placeholder="Name of gift..." 
                        onChange={handleControlledInputChange} 
                        defaultValue={gift.name}/>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date">Price of gift: </label>
                        <input type="number" id="date" name="price" required 
                        className="form-control" placeholder="Price of gift..." 
                        onChange={handleControlledInputChange} 
                        defaultValue={gift.price} />
                    </div>
                </fieldset>
                <fieldset>
                    <Button type="button"><Icon name="add"/>Link</Button>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="links">Link to gift </label>
                        <input type="url" id="link" name="link" required
                        className="form-control" placeholder="https://" 
                        onChange={handleControlledInputChange} 
                        defaultValue={gift.links ? gift.links[0].link : undefined} />
                    </div>
                </fieldset>
                {
                    gift.links?.map(gl => {
                        if (gl !== gift.links[0]) {
                            return (
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="links">Link to gift </label>
                                        <input type="url" id={`link-${gl.id}`} name="link" 
                                        className="form-control" placeholder="https://" 
                                        onChange={handleControlledInputChange} 
                                        defaultValue={gl.link} />
                                    </div>
                                </fieldset>
                            )
                        }
                    })
                }
                <fieldset>
                    <div className="form-group">
                        <Input type="radio" id="yes" name="purchased" required
                        className="form-control" value="yes"
                        onChange={handleControlledInputChange} 
                        defaultValue={gift.purchased}/>
                        <label htmlFor="yes">Yes</label>
                        <Input type="radio" id="no" name="purchased" required
                        className="form-control" value="no"
                        onChange={handleControlledInputChange} 
                        defaultValue={gift.purchased}/>
                        <label htmlFor="no">No</label>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select type="dropdown" name="celebrationId">
                            <option value="0" hidden>Please select a celebration...</option>
                            {
                                celebrations?.map(celebration => {
                                    if (celebration.userId === parseInt(localStorage.getItem("cs_user"))) {
                                        return <option value={celebration.id}>{celebration.name}</option>
                                    }
                                }).join("")               
                            }
                        </select>
                    </div>
                </fieldset>
                <Button primary type="submit"
                    disabled = {isLoading}
                    className="btn btn-primary">
                    {params.giftId ? "Save gift" : "Add gift"}
                </Button>
                <Button type="button" onClick={() => {
                    history.push(`/gifts/table/${params.tableId}`)
                }}>Cancel</Button>
            </form>
        </div>
    )
}