import Head from 'next/head';
import Sidebar from '../ui/Sidebar';
import Modal from 'react-modal';
import { useContext } from 'react';
import { QuioscoContext } from '../../context/quiosco';
import ModalProduct from '../ui/ModalProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Steps from '../ui/Steps';

type Props = {
  children: React.ReactNode;
  title: string;
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#__next');

const Layout = ({ title, children }: Props) => {
  const { modal } = useContext(QuioscoContext);
  return (
    <>
      <Head>
        <title>Café - {title}</title>
        <meta name="description" content="Quiosco Cafetería" />
      </Head>

      <section className="md:flex">
        <aside className="h-screen overflow-y-scroll md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <Sidebar />
        </aside>
        <main className="h-screen overflow-y-scroll md:w-8/12 xl:w-3/4 2xl:w-4/5">
          <section className="p-10">
            <Steps />
            {children}
          </section>
        </main>
      </section>
      {modal && (
        <Modal isOpen={modal} style={customStyles} contentLabel="Example Modal">
          <ModalProduct />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};

export default Layout;
