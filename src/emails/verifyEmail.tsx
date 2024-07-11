import * as M from '@react-email/components';

interface VerifyEmailProps {
    username: string;
    email: string;
    verifyCode?: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

const VerifyEmail = ({ username, email, verifyCode }: VerifyEmailProps) => {
    return (
        <M.Html>
            <M.Head>
                <title>Confirm your account</title>
            </M.Head>
            <M.Preview>
                confirm your account
            </M.Preview>
            <M.Tailwind>
                <M.Body className='bg-neutral-800 text-neutral-100'>
                    <M.Img
                        src={`${baseUrl}/static/logo.png`}
                        width="100"
                        alt='syn'
                        className='mx-auto mt-10'
                    />
                    <M.Container className='bg-neutral-600 mt-10 rounded-2xl w-11/12 max-w-2xl'>
                        <M.Section className='px-4 py-8 text-center'>
                        <M.Text className='text-indigo-300 font-extrabold text-4xl'>
                            Welcome on board!
                        </M.Text>
                        <M.Text className='mt-8 text-lg'>
                            Hello {username},
                        </M.Text>
                        <M.Text className='mt-2 text-lg'>
                            Please confirm your email to
                        </M.Text>
                        <M.Text className='mt-2 text-lg'>
                            activate your new account.
                        </M.Text>
                        <M.Text className='mt-16 text-lg'>
                            <M.Link href={`${baseUrl}/verify?token=${verifyCode}&email=${email}`} className='text-xl'>
                                Click here 
                            </M.Link>
                            <M.Text className="ml-2">
                                or copy and paste link below.
                            </M.Text>
                        </M.Text>
                        <M.Text>
                            {baseUrl}/verify?token={verifyCode}&email={email}
                        </M.Text>
                        </M.Section>
                    </M.Container>
                </M.Body>
            </M.Tailwind>
        </M.Html>
    );
};

export default VerifyEmail;
