import React, { useState, useContext, useEffect } from "react"
import { Button, Icon, Checkbox, Form } from "semantic-ui-react"
import { useHistory, useParams } from "react-router-dom"
import { GiftContext } from "./GiftProvider"
import { CelebrationContext } from "../celebration/CelebrationProvider"
import { LinkContext } from "./LinkProvider"
import { GiftListContext } from "./GiftListProvider"

export const GiftForm = () => {    
    const { getGiftById, updateGift, addGift } = useContext(GiftContext)
    const { getGiftListById } = useContext(GiftListContext)
    const { getCelebrationsByUserId, getCelebrationById, celebrations } = useContext(CelebrationContext)
    const { addLink, updateLink, removeLink, getLinksByGiftId } = useContext(LinkContext)

    const [table, setTable] = useState({})
    const [gift, setGift] = useState({})
    const [giftLinks, setGiftLinks] = useState([{ link: ""}])
    const [chosen, setChosen] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [celebration, setCelebration] = useState({})

    const history = useHistory()
    const params = useParams({})

    useEffect(() => {
        getGiftListById(params.tableId)
        .then(setTable)
        .then(() => getCelebrationsByUserId(localStorage.getItem("cs_user")))
        .then(() => {
            if (params.giftId) {
                getGiftById(params.giftId)
                .then(gift => {
                    setGift(gift)
                    setIsLoading(false)
                    gift.purchased ? setChosen("yes") : setChosen("no")
                    getLinksByGiftId(params.giftId).then(res => {
                        if (res.length > 0) {
                            setGiftLinks(res)
                        }
                    })
                    if (gift.celebrationId) {
                        getCelebrationById(gift.celebrationId).then(setCelebration)
                    }
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

    const handleRadioChange = (event, {value}) => {
        const newGift = { ...gift }
        setChosen(value)
        newGift[event.target.name] = value
        setGift(newGift)
    }

    const handleDropdownChange = (event) => {
        const newGift = { ...gift }
        setCelebration(event.target.value)
        newGift[event.target.name] = event.target.value
        setGift(newGift)
    }

    const handleLinks = (event) => {
        const newLinks = [ ...giftLinks ]
        newLinks[event.target.name].link = event.target.value
        setGiftLinks(newLinks)
    }

    const constructGiftObject = () => {
        setIsLoading(false);
        if (params.giftId) {
            Promise.all([
                updateGift({
                    id: parseInt(params.giftId),
                    gift: gift.gift,
                    price: parseInt(gift.price),
                    purchased: chosen === "yes" ? true : false,
                    celebrationId: gift.celebrationId ? parseInt(gift.celebrationId) : undefined,
                    giftListId: parseInt(params.tableId)
                }),
                giftLinks.map(gl => {
                    if (gl.link && gl.id) {
                        return updateLink({
                            id: gl.id,
                            link: gl.link,
                            giftId: parseInt(params.giftId)
                        })
                    } else if (gl.link) {
                        return addLink({
                            link: gl.link,
                            giftId: parseInt(params.giftId)
                        })
                    } else if (gl.id) {
                        removeLink(gl.id)
                    }
                })
            ])
            .then(() => {
                if (table.forSelf === false) {
                    history.push(`/gifts/table/${params.tableId}`)
                } else {
                    history.push("/")
                }
            })
        } else {
            addGift({
                gift: gift.gift,
                price: parseInt(gift.price),
                purchased: gift.purchased === "yes" ? true : false,
                celebrationId: gift.celebrationId ? parseInt(gift.celebrationId) : undefined,
                giftListId: parseInt(params.tableId)
            })
            .then(res => { 
                Promise.all([
                    giftLinks.map(gl => {
                        if (gl.link) {
                            return addLink({
                                link: gl.link,
                                giftId: res[0].id
                            })
                        }
                    })
                ])
            })
            .then(() => {
                if (table.forSelf === false) {
                    history.push(`/gifts/table/${params.tableId}`)
                } else {
                    history.push("/")
                }
            })
        }
    }

    return (
        <Form className="giftForm" onSubmit={evt => {
            evt.preventDefault() // Prevent browser from submitting the form
            constructGiftObject()
        }}>
            <h2 className="giftForm__title">
                {params.giftId ? "Update gift" : "New gift"}
            </h2>
            <Form.Field>
                <div className="form-group">
                    <label htmlFor="giftName">Name of gift </label>
                    <input type="text" id="giftName" name="gift" required autoFocus 
                    className="form-control" placeholder="Name of gift..." 
                    onChange={handleControlledInputChange} 
                    defaultValue={gift.gift}/>
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <label htmlFor="price">Price of gift </label>
                    <input type="number" id="price" name="price" required 
                    className="form-control" placeholder="Price of gift..." 
                    onChange={handleControlledInputChange} 
                    defaultValue={gift.price} />
                </div>
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <label htmlFor="links">Links to gifts</label>
                    <input type="url" id="links--0" name="0"
                    className="form-control" placeholder="https://"
                    onChange={handleLinks} 
                    value={giftLinks[0].link} />
                </div>
            </Form.Field>
            {
                giftLinks?.map((gl, i) => {
                    if (i !== 0) {
                        return (
                            <Form.Field key={`links--${i}`}>
                                <div className="form-group">
                                    <input type="url" 
                                    id={`links--${i}`} 
                                    name={i} 
                                    required
                                    value={gl.link}
                                    className="form-control"  
                                    placeholder="https://"
                                    onChange={handleLinks} 
                                    />
                                    <Button type="button" onClick={() => {                                             
                                        const values = [...giftLinks];
                                        const value = values.find(value => value.link === gl.link)
                                        const valueIndex = values.indexOf(value)
                                        values.splice(valueIndex, 1)
                                        setGiftLinks(values)
                                        if (value.id) {
                                            removeLink(value.id)
                                        }
                                    }}>Delete</Button>
                                </div>
                            </Form.Field>
                        )
                    }
                })
            }
            <Button type="button" onClick={() => {
                const values = [...giftLinks];
                values.push({ link: ""});
                setGiftLinks(values);
            }}><Icon name="add"/>Link</Button>
            <Form.Field>
                {table.forSelf === false ? "Have you purchased this gift?" : "Has this gift been bought for you?"}
            </Form.Field>
            <Form.Field>
                    <Checkbox radio label="Yes" id="yes" name="purchased" required
                    value="yes"
                    style={{ marginLeft: 15, marginRight: 25 }}
                    checked={chosen === "yes"}
                    onChange={handleRadioChange} 
                    />
                
                    <Checkbox radio label="No" id="no" name="purchased" required
                    value="no"
                    checked={chosen === "no"}
                    onChange={handleRadioChange} 
                    />  
            </Form.Field>
            <Form.Field>
                Select the celebration associated with this gift
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <select name="celebrationId" value={celebration.id} onChange={handleDropdownChange} required={chosen==="yes"}>
                        <option value="" hidden>Please select a celebration...</option>
                        {
                            celebrations?.map(celebration => {
                                return <option key={celebration.id} value={celebration.id}>{celebration.name}</option>
                            })
                        }
                    </select>
                </div>
            </Form.Field>
            <Button primary type="submit"
                disabled = {isLoading}
                className="btn btn-primary">
                {params.giftId ? "Save gift" : "Add gift"}
            </Button>
            <Button type="button" onClick={() => {
                if (table.forSelf === false) {
                    history.push(`/gifts/table/${params.tableId}`)
                } else {
                    history.push("/")
                }
            }}>Cancel</Button>
        </Form>
    )
}