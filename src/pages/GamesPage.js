import React from 'react';
import QRCode from '../components/QRCode';
import Deck from '../components/Deck';

function HostSettingsPage() {
    const gameCode = 'game-unique-code';

    return (
        <div>
            <h2>Host Game Settings</h2>
            <QRCode gameCode={gameCode} />
            <h3>Select Decks</h3>
            <Deck theme="Business" />
            <Deck theme="Technology" />
        </div>
    );
}

export default HostSettingsPage;
