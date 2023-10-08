import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { FaLockOpen, FaLock, FaTrashCan, FaTrash } from "react-icons/fa6";

import {
    loadUsers,
    removeUsers,
    blockUsers,
    unblockUsers,
} from "../reducers/usersReducer";

const Users = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const dispatch = useDispatch();

    const users = useSelector(({ users }) => users);

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

    const toggleUserSelection = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            const allUserIds = users.map((user) => user.id);
            setSelectedUsers(allUserIds);
        }
        setSelectAll(!selectAll);
    };

    const resetSelection = () => {
        setSelectedUsers([]);
        setSelectAll(false);
    };

    const handleDeleteButton = () => {
        dispatch(removeUsers(selectedUsers));
        resetSelection();
    };

    const handleBlockButton = () => {
        dispatch(blockUsers(selectedUsers));
        resetSelection();
    };

    const handleUnblockButton = () => {
        dispatch(unblockUsers(selectedUsers));
        resetSelection();
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return "Never logged in";
        }
        const parsedDate = new Date(dateString);
        const formattedDate = format(parsedDate, "MMMM dd, yyyy HH:mm:ss");
        return formattedDate;
    };

    return (
        <Container fluid>
            <Stack direction="horizontal" gap={3} className="my-4">
                <Button onClick={handleBlockButton}>
                    <span className="icon-span">
                        <FaLock /> Block
                    </span>
                </Button>
                <Button onClick={handleUnblockButton}>
                    <FaLockOpen />
                </Button>
                <Button variant="danger" onClick={handleDeleteButton}>
                    <FaTrashCan />
                </Button>
            </Stack>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th className="checkbox-align">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Last Login</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        const isSelected = selectedUsers.includes(user.id);

                        return (
                            <tr key={user.id}>
                                <th className="checkbox-align">
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() =>
                                            toggleUserSelection(user.id)
                                        }
                                    />
                                </th>
                                <th>{user.name}</th>
                                <th>{user.email}</th>
                                <th>{formatDate(user.lastLogin)}</th>
                                <th>{user.status}</th>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
};

export default Users;
