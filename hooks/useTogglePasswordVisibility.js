import { useState } from 'react';

export default function useTogglePasswordVisibility() {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [buttonText, setButtonText] = useState('Show');

    const handlePasswordVisibility = () => { 
        if (buttonText === 'Show') {
            setButtonText('Hide');
            setPasswordVisibility(!passwordVisibility);
        } else if (buttonText === 'Hide') {
            setButtonText('Show');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    return {
        passwordVisibility,
        buttonText,
        handlePasswordVisibility
    };
};