'use client';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import SigninAction from '@/action/admin/signin-action';
export default function SigninForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const SigninSubmit = async (data:object) => {
        let res = await SigninAction(data);
    }
    return (
        <Form className='w-25 text-white' onSubmit={handleSubmit(SigninSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <input type='email' {...register('email', {
                    required: true,
                    pattern: { value: /\S+@\S+\.\S+/, message: '' }
                }
                )} className='form-control' placeholder="Enter email" />
                <Form.Text className="text-danger">
                    {errors.email?.type === 'required' && 'Please enter email'}
                    {errors.email?.type === 'pattern' && 'Please enter valid email'}
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <input type="password" {...register('password', {
                    required: true,
                    minLength: { value: 3, message: '' },
                    maxLength: { value: 12, message: '' }
                }
                )} className='form-control' placeholder="Password" />
                <Form.Text className="text-danger">
                    {errors.password?.type === 'required' && 'Please enter password'}
                    {errors.password?.type === 'minLength' && 'Minimum length should be 3 characters'}
                    {errors.password?.type === 'maxLength' && 'Maximum length should be 12 characters'}
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}