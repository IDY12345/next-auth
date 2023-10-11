import React from 'react'
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import {Heading} from '@react-email/heading'
import {Text} from '@react-email/text'
import {Hr} from '@react-email/hr'

function ForgotPasswordEmail({params}:{params:{name:string,url:string}}) {
  return (
    <Html>
        <Heading as="h2">
        Hello {params.name} Reset Your Password
        </Heading>
        <Text>
            We Recieved the reset password request.If its not you then pls ignore it.
        </Text>
        <Button
        pX={20}
        pY={20}
        href={params.url}
        style={{background:"black",color:"white"}}
        >
            Reset Password
        </Button>
        <Hr />
        <Heading as='h3'>
            Regards
        </Heading>
        <Text>
            Ishaan Yeole
        </Text>
    </Html>
  )
}

export default ForgotPasswordEmail