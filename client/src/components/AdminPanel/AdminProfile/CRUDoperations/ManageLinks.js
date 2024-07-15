import React, { useContext, useState } from 'react';
import LinkContext from '../../../Context/LinkContext/linkContext';
import AddLink from './AddLink';
import EditLink from './EditLink';
import DeleteLink from './DeleteLink';
import LinkCard from '../../../UIcomponent/LinkCard';
import styled from 'styled-components';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const ManageLinks = () => {
    const { links, deleteLink, editLink } = useContext(LinkContext);
    const [editingLink, setEditingLink] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [linkToDelete, setLinkToDelete] = useState(null);
    const [showSocial, setShowSocial] = useState(false);


    const handleSaveLink = () => {
        if (!editingLink.title || !editingLink.url) {
            alert('Title and URL cannot be empty.');
            return;
        }
        editLink(editingLink._id, editingLink.title, editingLink.url, editingLink.social);
        setEditingLink(null);
        setShowEditModal(false);
    };

    const handleDeleteLink = () => {
        deleteLink(linkToDelete._id);
        setShowDeleteModal(false);
    };

    const handleCancelEdit = () => {
        setEditingLink(null);
        setShowEditModal(false);
    };

    const changeToProfile = () => {
        setShowSocial(false);
    };

    const changeToSocial = () => {
        setShowSocial(true);
    };

    const Card = styled.div`
        background-color: #fff;
        border-radius: 1vh;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        margin-bottom: 20px;
        padding: 10px;
        transition: transform 0.3s ease-in-out;

        .card {
            border: none;
        }

        .card-title,
        .card-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .d-flex {
            margin-top: 10px;
        }
    `;

    const EditButton = styled(BsPencilSquare)`
        cursor: pointer;
        margin-right: 15px;
    `;

    const DeleteButton = styled(BsTrash)`
        cursor: pointer;
    `;

    return (
        <div className="container">
            <h1
                style={{
                    fontSize: '7vh',
                    fontWeight: '900',
                    backgroundImage: 'linear-gradient(to right, #753a88, #cc2b5e)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    marginBottom: '20px'
                }}
            >
                Manage Links
            </h1>

            <AddLink />

            <div className="d-none d-lg-flex flex-row row">
                <div className="col-md-6">
                    <h2 style={{ fontWeight: '600' }}>Your Profiles</h2>
                    {links.filter(link => !link.social).reverse().map(link => (
                        <LinkCard
                            key={link._id}
                            link={link}
                            setEditingLink={setEditingLink}
                            setShowEditModal={setShowEditModal}
                            setShowDeleteModal={setShowDeleteModal}
                            setLinkToDelete={setLinkToDelete}
                            Card={Card}
                            EditButton={EditButton}
                            DeleteButton={DeleteButton}
                        />
                    ))}
                </div>
                <div className="col-md-6">
                    <h2 style={{ fontWeight: '600' }}>Social Handles</h2>
                    {links.filter(link => link.social).reverse().map(link => (
                        <LinkCard
                            key={link._id}
                            link={link}
                            setEditingLink={setEditingLink}
                            setShowEditModal={setShowEditModal}
                            setShowDeleteModal={setShowDeleteModal}
                            setLinkToDelete={setLinkToDelete}
                            Card={Card}
                            EditButton={EditButton}
                            DeleteButton={DeleteButton}
                        />
                    ))}
                </div>
            </div>

            <div className="d-lg-none">
                <div className="d-flex flex-row justify-content-center text-center" style={{ borderRadius: '1.35vh', border: '1px solid black', marginBottom: '20px' }}>
                    <div
                        onClick={changeToProfile}
                        style={{
                            background: showSocial ? 'white' : 'linear-gradient(to right, #753a88, #cc2b5e)',
                            color: showSocial ? 'black' : 'white',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '100%',
                            borderRadius: '1.25vh'
                        }}
                    >
                        Your Profiles
                    </div>
                    <div
                        onClick={changeToSocial}
                        style={{
                            background: showSocial ? 'linear-gradient(to right, #753a88, #cc2b5e)' : 'white',
                            color: showSocial ? 'white' : 'black',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '100%',
                            borderRadius: '1.25vh'
                        }}
                    >
                        Social handles
                    </div>
                </div>
                <div>
                    {showSocial === false ? (
                        links.filter(link => !link.social).reverse().map(link => (
                            <LinkCard
                                key={link._id}
                                link={link}
                                setEditingLink={setEditingLink}
                                setShowEditModal={setShowEditModal}
                                setShowDeleteModal={setShowDeleteModal}
                                setLinkToDelete={setLinkToDelete}
                                Card={Card}
                                EditButton={EditButton}
                                DeleteButton={DeleteButton}
                            />
                        ))
                    ) : (
                        links.filter(link => link.social).reverse().map(link => (
                            <LinkCard
                                key={link._id}
                                link={link}
                                setEditingLink={setEditingLink}
                                setShowEditModal={setShowEditModal}
                                setShowDeleteModal={setShowDeleteModal}
                                setLinkToDelete={setLinkToDelete}
                                Card={Card}
                                EditButton={EditButton}
                                DeleteButton={DeleteButton}
                            />
                        ))
                    )}
                </div>
            </div>

            <EditLink
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                link={editingLink}
                setEditingLink={setEditingLink}
                handleSaveLink={handleSaveLink}
                handleCancelEdit={handleCancelEdit}
            />

            <DeleteLink
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                handleDeleteLink={handleDeleteLink}
            />
        </div>
    );
};

export default ManageLinks;
