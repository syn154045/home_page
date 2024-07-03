const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full bg-admin-base min-h-screen font-redditMono text-admin-text-main'>
            {children}
        </div>
    );
};

export default AdminLayout;
