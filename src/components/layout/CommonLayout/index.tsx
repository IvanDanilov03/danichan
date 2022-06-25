import React from 'react';
import { Link } from 'react-router-dom';

import logoImageSrc from '../../../static/images/logo.png';
import musicSrc from '../../../static/music/rick-roll.mp3';
import UsernameForm from '../../forms/UsernameForm';

const CommonLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="h-screen">
      <div className="container mx-auto flex flex-col">
        <header className="mx-auto p-8">
          <Link to="/">
            <img
              src={logoImageSrc}
              alt="Danichan logo"
              width="504"
              height="150"
            />
          </Link>
        </header>
        <div className="mx-auto mb-10">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio controls loop>
            <source src={musicSrc} type="audio/mpeg" />
          </audio>
        </div>
        <div className="mx-auto">
          <UsernameForm />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default CommonLayout;
