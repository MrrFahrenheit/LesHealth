import { getMe } from '@/components/api/get-user-me'
import LeftNavBar from '@/modules/les/components/ui/LeftNavBar'
import TopNavBar from '@/modules/les/components/ui/TopNavBar'
import { UserProvider } from '@/providers/userProvider'

// Asumo la importación de LayoutProps según tu código
import { LayoutProps } from '...'; 

export default async function Layout({ children }: LayoutProps<"/">) {
    const user = await getMe();
    
    return (
        <UserProvider initialUser={user || {email:"", fullName:""}}>
            {/* Contenedor global de la aplicación */}
            <div className="min-h-screen w-full bg-[#F8F9FC]">
                
                {/* Los Navbars al ser fixed se posicionan de forma absoluta en la pantalla */}
                <LeftNavBar />
                <TopNavBar />
                
                {/* El main compensa el espacio de los elementos fixed usando padding */}
                <main className="
                    w-full 
                    min-h-screen 
                    pt-16           /* Espacio superior para el TopNavBar en móvil/desktop (64px aprox) */
                    pb-20          /* Espacio inferior para el LeftNavBar si en móvil se vuelve bottom-bar */
                    md:pb-0         /* En desktop quitamos el padding inferior */
                    md:pt-10         /* Opcional: más espacio superior en desktop si el TopNav es más alto */
                    md:pl-[270px]   /* ¡CLAVE! Espacio izquierdo igual al ancho exacto de tu LeftNavBar */
                ">
                    {children}
                </main>
            </div>
        </UserProvider>
    )
}