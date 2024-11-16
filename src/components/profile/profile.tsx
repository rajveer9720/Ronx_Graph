'use client';
import { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';
import AuthorInformation from '@/components/author/author-information';
import { authorData } from '@/data/static/author';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import userBanner from '@/assets/images/userBanner.png';
import { useWallet } from '@/app/context/WalletContext';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';

interface User {
  _id: string;
  userid: number;
  userWalletAddress: string;
  profilePic: string;
  personalLink: string;
  username: string;
}

export default function Profile() {
  const {users} = useSmartContract();
  const {walletAddress} = useWallet();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  const [user, setUser] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [personalLink, setPersonalLink] = useState<string | null>(null);
  const [username, setusername] = useState<string | null>(null);
  const [referal, setReferal] = useState<string | null>(null);
  const [referalId, setReferalId] = useState<number | null>(null);
  const [timeStamps, setTimeStamps] = useState<number | null>(null);

    const userreferal = async (walletAddress:string) => {
        const data = await users(walletAddress);
        if (data) {
          setUserId(data.id);
          setTimeStamps(data.registrationTime);
        }
        const responseaddress:string | undefined = data?.referrer;
        console.log("responseaddress:",responseaddress);
        const referaIddata = responseaddress ? await users(responseaddress) : null;
        console.log("referaId:",referaIddata);
        try{
          
          if(referaIddata?.id) {
            setReferalId(referaIddata.id);
            setError(null);
          }
        }catch(error){
          console.error('Error fetching users:', error);
          setError('Failed to fetch users');
    }  
  };

  // add timestap converotr

    
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data && data.length > 0) {
          // Assuming the data is an array of users, we fetch the first user for display
          const user = data[0];
          setusername(user?.username);
          setUserId(user.userid);
          setProfilePic(user.profilePic);
          setPersonalLink(user.personalLink);
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (walletAddress) {
      userreferal(walletAddress);
    }
  }, [users,walletAddress]);

  const handleCopyToClipboard = () => {
    copyToClipboard(authorData.wallet_key);
    setCopyButtonStatus(true);
    setTimeout(() => setCopyButtonStatus(false), 2500);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row 3xl:pt-12">
      {/* Author Information */}
      <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 3xl:ltr:pr-14 3xl:rtl:pl-14">
      <div className="md:max-w-auto mx-auto mt-5 flex h-9 max-w-sm items-center rounded-full bg-white shadow-card dark:bg-light-dark md:mx-0 xl:mt-6">
            <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
            ID: {userId}
            </div>
            <div className="text truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:text-sm">
            {walletAddress?.substr(walletAddress.length - 10)}
            </div>
            <div
              title="Copy Address"
              className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={handleCopyToClipboard}
            > 
              {copyButtonStatus ? (
                <Check className="h-auto w-3.5 text-green-500" />
              ) : (
                <Copy className="h-auto w-3.5" />
              )}
            </div>
          </div>
          {referalId ? 
        <div className="text-center ltr:md:text-left rtl:md:text-right flex space-x-2">
          <h2 className="mt-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
          invited  {timeStamps && new Date(parseInt(timeStamps.toString(), 10) * 1000).toLocaleDateString()} 
          </h2>
          <div className="text-lg font-medium pt-1 text-gray-900 dark:text-white xl:text-md">
              by <a href="#">{referalId}</a>
          </div>
         
        </div>
        : undefined}
      </div>

      {/* Profile Sections */}
      <div className="w-full flex-row">
        {/* Personal Link Section */}
        <div className="profile-section p-1 text-white rounded-lg w-full">
          <div className="profile-header flex items-center">
            <div className="w-full">
              <div className="profile-link mt-2 p-4 bg-[#406AFF] bg-opacity-60 rounded-xl">
                <h4 className="mb-6">Personal Link</h4>
                <a href={personalLink || "#"} target="_blank" rel="noopener noreferrer" className="text-white hover:underline text-2xl">
                  {personalLink || "No Personal Link"}
                </a>
                
              </div>
            </div>
          </div>
        </div>

        {/* Banner Section */}
        <div className="profile-section p-1 text-white rounded-lg w-full">
          <div className="profile-header flex items-center">
            <div className="w-full">
              <div
                className="profile-link mt-2 p-4 h-24 bg-opacity-60 rounded-xl"
                style={{
                  backgroundImage: `url(${userBanner.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '15vh',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="flex gap-6 ml-12">
                  <h4 className="mt-6 text-xl">Ronx Token</h4>
                  <a href="https://RonX.io/b/pyffvf" target="_blank" rel="noopener noreferrer" className="text-white mt-6">
                    Login in RonX
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthorInformation data={authorData} />
    </div>
  );
}
