import Image from 'next/image';
import LesHealthLogoType from '../../src/logos/logotipo.svg';

export default function LesHealthLogo() {
    return (
        <Image
            src={LesHealthLogoType}
            alt="Les Health"
            width={250}
            height={75}
        />
    );
}