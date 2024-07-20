import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiCopy, FiExternalLink } from 'react-icons/fi';
import { MdDone } from 'react-icons/md';
import { FaSadTear } from 'react-icons/fa';

const Card = styled.div`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    margin-bottom: 20px;
    padding: 20px;
    transition: transform 0.3s ease-in-out;
    text-align: left;

    .card-title,
    .card-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 10px;
    }

    .d-flex {
        margin-top: 10px;
        align-items: center;
    }

    .icon {
        cursor: pointer;
        font-size: 1.2em;
        margin-right: 10px;
        display: flex;
        align-items: center;
    }
`;

const NoLinksMessage = styled.div`
    text-align: center;
    margin: 20px;
    padding: 20px;
    font-size: 18px;
    border-radius: 10px;
    color: grey;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

    .icon {
        font-size: 2em;
        margin: 20px;
    }
`;

function UserLinks(props) {
    const [showSocial, setShowSocial] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [links, setLinks] = useState([]);
    const username = props.username;

    const host = 'https://link-vink-server.vercel.app';

    useEffect(() => {
        const fetchLinks = async () => {
            const response = await fetch(`${host}/link/links/${username}`);
            const data = await response.json();
            setLinks(data.links);
        };
        fetchLinks();
    }, [username]);

    const changeToProfile = () => {
        setShowSocial(false);
    };

    const changeToSocial = () => {
        setShowSocial(true);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopySuccess(true);
                setTimeout(() => {
                    setCopySuccess(false);
                }, 1000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    };

    const openLink = (url) => {
        window.open(url, '_blank');
    };

    const renderLinks = (filteredLinks) => {
        if (filteredLinks.length === 0) {
            return (
                <NoLinksMessage>
                    <FaSadTear className="icon" />
                    No links to display <br /> Try again later
                </NoLinksMessage>
            );
        }

        return filteredLinks.reverse().map((link) => (
            <Card key={link._id}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{link.title}</h5>
                        <p className="card-text">{link.url}</p>
                        <div className="d-flex" style={{ marginTop: '2vh' }}>
                            <span className="icon" onClick={() => copyToClipboard(link.url)}>
                                {copySuccess ? <MdDone /> : <FiCopy />}
                            </span>
                            <FiExternalLink className="icon" onClick={() => openLink(link.url)} />
                        </div>
                    </div>
                </div>
            </Card>
        ));
    };

    return (
        <div className='container' style={{ marginTop: '10vh' }}>
            <div className="d-none d-lg-flex flex-row row">
                <div className="col-md-6">
                    <h2 style={{ fontWeight: '600', marginBottom: '5vh' }}>My Profiles</h2>
                    {renderLinks(links.filter((link) => !link.social))}
                </div>
                <div className="col-md-6">
                    <h2 style={{ fontWeight: '600', marginBottom: '5vh' }}>Social Handles</h2>
                    {renderLinks(links.filter((link) => link.social))}
                </div>
            </div>

            <div className="d-lg-none">
                <div className="d-flex flex-row justify-content-center text-center" style={{ borderRadius: '10px', border: '1px solid #ddd', marginBottom: '20px', padding: '10px' }}>
                    <div
                        onClick={changeToProfile}
                        style={{
                            background: showSocial ? '#f5f5f5' : 'linear-gradient(to right, #753a88, #cc2b5e)',
                            color: showSocial ? '#333' : '#fff',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '50%',
                            borderRadius: '10px 0 0 10px',
                            textAlign: 'center',
                            borderRight: showSocial ? '1px solid #ddd' : 'none',
                        }}
                    >
                        Your Profiles
                    </div>
                    <div
                        onClick={changeToSocial}
                        style={{
                            background: showSocial ? 'linear-gradient(to right, #753a88, #cc2b5e)' : '#f5f5f5',
                            color: showSocial ? '#fff' : '#333',
                            padding: '10px',
                            cursor: 'pointer',
                            width: '50%',
                            borderRadius: '0 10px 10px 0',
                            textAlign: 'center',
                            borderLeft: showSocial ? 'none' : '1px solid #ddd',
                        }}
                    >
                        Social handles
                    </div>
                </div>
                <div>
                    {showSocial === false
                        ? renderLinks(links.filter((link) => !link.social))
                        : renderLinks(links.filter((link) => link.social))
                    }
                </div>
            </div>
        </div>
    );
}

export default UserLinks;
