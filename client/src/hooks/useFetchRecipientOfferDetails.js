import { useEffect, useState } from "react"
import axios from 'axios';

export const useFetchRecipientOfferDetails = (listingId) => {
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const fetchListing = async() => {
            const response = await axios(`/api/listing/get/${listingId}`);

            setListing(response.data);
        }

        fetchListing();
    }, []);
    return listing;
}