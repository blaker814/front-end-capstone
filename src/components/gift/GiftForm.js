import React, { useState, useContext, useEffect } from "react"
import { Button, Icon, Dropdown, Checkbox, Form } from "semantic-ui-react"
import { useHistory, useParams } from "react-router-dom"
import { GiftContext } from "./GiftProvider"
import { CelebrationContext } from "../celebration/CelebrationProvider"
import { LinkContext } from "./LinkProvider"

export const GiftForm = () => {    
    const { getGiftById, updateGift, addGift } = useContext(GiftContext)
    const { getCelebrations, celebrations } = useContext(CelebrationContext)
    const { addLink, updateLink } = useContext(LinkContext)

    const [gift, setGift] = useState({})
    const [giftLinks, setGiftLinks] = useState([{}])
    const [chosen, setChosen] = useState({})
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
            } else if (gift.links) {
                setGiftLinks(gift.links)
                setIsLoading(false)
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

    const handleDropdownChange = (event, data) => {
        const newGift = { ...gift }
        newGift[data.name] = data.value
        setGift(newGift)
    }

    const handleLinks = (event) => {
        const newLinks = [ ...giftLinks ]
        newLinks[event.target.name.split("--")[1]].link = event.target.value
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
                    purchased: gift.purchased === "yes" ? true : false,
                    celebrationId: gift.celebrationId,
                    giftListId: parseInt(params.tableId)
                }),
                giftLinks.map(gl => {
                    return updateLink({
                        id: gl.id,
                        link: gl.link,
                        giftId: parseInt(params.giftId)
                    })
                })
            ])
            .then(() => history.push(`/gifts/table/${params.tableId}`))
        } else {
            addGift({
                gift: gift.gift,
                price: parseInt(gift.price),
                purchased: gift.purchased === "yes" ? true : false,
                celebrationId: parseInt(gift.celebrationId),
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
            .then(() => history.push(`/gifts/table/${params.tableId}`))
        }
    }

    const dropdownOptions = celebrations?.map(celebration => {
        if (celebration.userId === parseInt(localStorage.getItem("cs_user"))) {
            return {
                key: celebration.id,
                text: celebration.name,
                value: celebration.id
            }
        }
    })

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
                    defaultValue={gift.name}/>
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
                    <input type="url" id="links--0" name="links--0"
                    className="form-control" placeholder="https://"
                    onChange={handleLinks} 
                    defaultValue={gift.links ? gift.links[0].link : undefined} />
                </div>
            </Form.Field>
            {
                giftLinks?.map((gl, i) => {
                    if (i !== 0) {
                        return (
                            <Form.Field key={i}>
                                <div className="form-group">
                                    <input type="url" 
                                    id={`links--${i}`} 
                                    name={`links--${i}`} 
                                    className="form-control"  
                                    placeholder="https://"
                                    onChange={handleLinks} 
                                    defaultValue={gl.link ? gl.link : undefined} />
                                </div>
                            </Form.Field>
                        )
                    }
                })
            }
            <Button type="button" onClick={() => {
                const values = [...giftLinks];
                values.push({});
                setGiftLinks(values);
            }}><Icon name="add"/>Link</Button>
            <Form.Field>
                Have you purchased this gift?
            </Form.Field>
            <Form.Field>
                    <Checkbox radio label="Yes" id="yes" name="purchased" required
                    value="yes"
                    style={{ marginLeft: 15, marginRight: 25 }}
                    checked={chosen === "yes"}
                    onChange={handleRadioChange} 
                    defaultValue={gift.purchased}/>
                
                    <Checkbox radio label="No" id="no" name="purchased" required
                    value="no"
                    checked={chosen === "no"}
                    onChange={handleRadioChange} 
                    defaultValue={gift.purchased}/>  
            </Form.Field>
            <Form.Field>
                If so, for what celebration?
            </Form.Field>
            <Form.Field>
                <div className="form-group">
                    <Dropdown 
                        selection
                        type="dropdown" 
                        name="celebrationId" 
                        placeholder="Please select a celebration..." 
                        options={dropdownOptions} 
                        onChange={handleDropdownChange}
                    />
                </div>
            </Form.Field>
            <Button primary type="submit"
                disabled = {isLoading}
                className="btn btn-primary">
                {params.giftId ? "Save gift" : "Add gift"}
            </Button>
            <Button type="button" onClick={() => {
                history.push(`/gifts/table/${params.tableId}`)
            }}>Cancel</Button>
        </Form>
    )
}