import React from 'react';

const LinkCard = ({
    link,
    setEditingLink,
    setShowEditModal,
    setShowDeleteModal,
    setLinkToDelete,
    Card,
    EditButton,
    DeleteButton,
}) => {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };
    

    return (
        <Card>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{truncateText(link.title, 20)}</h5>
                    <p className="card-text">{truncateText(link.url, 30)}</p>
                    <div className="d-flex">
                        <EditButton onClick={() => { setEditingLink(link); setShowEditModal(true); }} />
                        <DeleteButton onClick={() => { setShowDeleteModal(true); setLinkToDelete(link); }} />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LinkCard;
