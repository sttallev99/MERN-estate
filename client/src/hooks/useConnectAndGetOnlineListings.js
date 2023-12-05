import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addSocket } from "../redux/socket/socketSlice";
import axios from "axios";
import { addListing } from "../redux/onlineListing/onlineListingSlice";

const useConnectAndGetOnlineListings = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const socket = useSelector(state => state.socket);

    const dispatch = useDispatch();
    //CREATE WEB SOCKET CONNECTION
    useEffect(() => {
        if(currentUser && socket.value === null) {
            const socket = io('http://localhost:3000');
            dispatch(addSocket(socket));
        }
    }, [currentUser, socket, dispatch]);

    //TODO GET ONLINE USER LISTINGS
    useEffect(() => {
        const fetchOnlineUserListings = async () => {
            const res = await axios.get(`/api/user/listings/${currentUser._id}`);
            const userListings = res.data;

            socket.value.emit('addOnlineUserListings', userListings, socket.value.id);
            socket.value.on('getOnlineUserListings', (onlineUserListings) => {
                dispatch(addListing(onlineUserListings))
            })
        }

        if(currentUser && socket.value) {
            fetchOnlineUserListings();
        }
    }, [currentUser, socket, dispatch]);
}

export default useConnectAndGetOnlineListings;