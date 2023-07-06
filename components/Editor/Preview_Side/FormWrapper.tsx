'use client';
import { ReactNode, useState, useEffect } from 'react';
import { FormData } from './PreviewForm';

type FormWrapperProps = {
  title: string;
  children: ReactNode;
  data: FormData;
  imageUrls: string[];
};

export function FormWrapper({
  title,
  children,
  data,
  imageUrls
}: FormWrapperProps) {
  return (
    <>
      <div
        style={{
          color: data['textColor']
        }}
      >
        {' '}
        <div
          className="bg-centerr h-20 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrls[0]})` }}
        >
          <div className="flex h-full items-center justify-center">{title}</div>
        </div>
        <div className="space-x- grid-cols-[auto, minmax(auto, 400px)] grid justify-center space-y-4">
          {children}
        </div>
      </div>
    </>
  );
}
