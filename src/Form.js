import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import UserCard from './UserCard';

const UserForm = ({errors, touched, status}) => {

    const [user, setUser] = useState([])
    console.log(user)
    console.log(status)
    console.log(touched)

    useEffect(() => {
        if(status) {
            setUser([...user, status])
        }
    }, [status])

    return (
        <Form>
            <div className="info-container">
                {touched.name && errors.name && <p className="error">{errors.name}</p>}
                <Field className="info" type="text" name="name" placeholder="First Name" />

                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                <Field className="info" type="text" name="email" placeholder="Email" />

                {touched.password && errors.password && <p className="error">{errors.password}</p>}
                <Field className="info" type="text" name="password" placeholder="Password" />

                {touched.role && errors.role && <p className="error">{errors.role}</p>}
                <Field component="select" name="role">
                    <option value="" disabled>Select Role:</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Fullstack</option>
                    <option value="ux-design">UX Designer</option>
                    <option value="mobile">Mobile</option>
                    <option value="data-scientist">Data Scientist</option>
                </Field>

                {touched.service && errors.service && <p className="error">{errors.service}</p>}
                <div>
                    <label>Terms of service:</label>
                    <Field type="checkbox" name="service" />
                </div>
                <button type="submit">Submit</button>
            </div>
            <div className="card-container">
                {user.map((ppl, index) => (
                    <UserCard name={ppl.name} email= {ppl.email} role= {ppl.role} key={index} />
                ))}
            </div>
        </Form>
        
    )
};

export default withFormik({
    mapPropsToValues: (values) => {
        return {
            name: values.name || "",
            email: values.email || "",
            password: values.password || "",
            role: values.role || "",
            service: values.service || false
        }
    },
    validationSchema: yup.object().shape({
        name: yup.string().required("Please fill in field"),
        email: yup.string().required("Please fill out field"),
        password: yup.string().required("Plese fill out field"),
        role: yup.string().required("Please select role"),
        service: yup.boolean().oneOf([true], "Term of service must be checked")
    }),
    handleSubmit: (values, {setStatus}) => {
        axios.post("https://reqres.in/api/users", values)
            .then((res) => {
                console.log(res)
                setStatus(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
})(UserForm);