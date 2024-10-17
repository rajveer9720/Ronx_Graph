'use client';

import { useState } from 'react';
import AnchorLink from '@/components/ui/links/anchor-link';
import Checkbox from '@/components/ui/forms/checkbox';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';
import { useRouter } from 'next/navigation';

// import icons
import { EyeIcon } from '@/components/icons/eye';
import { EyeSlashIcon } from '@/components/icons/eyeslash';

export default function SignUpForm() {
  const router = useRouter();
  const [state, setState] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  function validateField(name: string, value: string) {
    const newErrors = { ...errors };

    switch (name) {
      case 'firstName':
        newErrors.firstName = value ? '' : 'First Name is required';
        break;
      case 'lastName':
        newErrors.lastName = value ? '' : 'Last Name is required';
        break;
      case 'email':
        if (!value) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = 'Email is invalid';
        else newErrors.email = '';
        break;
      case 'password':
        newErrors.password = value ? '' : 'Password is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (Object.values(errors).every(x => x === '')) {
      console.log(formData);
      // Handle successful form submission
    }
  }

  const handleRegisterBUSD = () => {
    // window.location.href = 'http://localhost:3000/authentication/reset-pin'; // Replace with your desired URL
    router.push('/authentication/reset-pin');
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
        <Input
          name="firstName"
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          inputClassName="focus:!ring-0 placeholder:text-[#6B7280]"
        />
        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
        <Input
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          inputClassName="focus:!ring-0 placeholder:text-[#6B7280]"
        />
        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
      </div>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        inputClassName="focus:!ring-0 placeholder:text-[#6B7280]"
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      <div className="relative">
        <Input
          name="password"
          type={state ? 'text' : 'password'}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          inputClassName="focus:!ring-0 placeholder:text-[#6B7280]"
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        <span
          className="absolute bottom-3 right-4 cursor-pointer text-[#6B7280] rtl:left-4 rtl:right-auto sm:bottom-3.5"
          onClick={() => setState(!state)}
        >
          {state ? (
            <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </span>
      </div>
      <Checkbox
        iconClassName="bg-[#4B5563] rounded mt-0.5"
        label={
          <>
            I’ve read and agree with
            <AnchorLink
              href={'#'}
              className="ml-2 font-medium tracking-[0.5px] underline dark:text-gray-300"
            >
              Terms of Service and our Privacy Policy
            </AnchorLink>
          </>
        }
        labelPlacement="end"
        labelClassName="ml-1.5 text-[#4B5563] !text-xs dark:text-gray-300 tracking-[0.5px] !leading-7"
        containerClassName="!items-start"
        inputClassName="mt-1 focus:!ring-offset-[1px]"
        size="sm"
      />
      <Button
        type="submit"
        onClick={handleRegisterBUSD}
        className="mt-5 rounded-lg !text-sm uppercase tracking-[0.04em]"
      >
        sign up
      </Button>
    </form>
  );
}
// testing code

