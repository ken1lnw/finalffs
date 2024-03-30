import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            id: { label: "id", type: "text", placeholder: "id" },
            name: { label: "name", type: "text" , placeholder: "name" }
          },
          async authorize(credentials, req) {
            // You need to provide your own logic here that takes the credentials
            // submitted and returns either a object representing a user or value
            // that is false/null if the credentials are invalid.
            // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            // You can also use the `req` object to obtain additional parameters
            // (i.e., the request IP address)
            const res = await fetch(`https://ffsfinal.netlify.app/\/api/dbuser/check`, {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" }
            })
            const user = await res.json()
            console.log(user);
      
            // If no error and we have user data, return it
            if (res.ok && user) {

              return {
                id:user.user.userId,
                name:user.user.name,
                lname:user.user.lname,
                role:user.user.role,
                admin:user.user.admin,


              }
            }
            // Return null if user data could not be retrieved
            return null
          }
        })
      ],

      session: {
        strategy: 'jwt',
      },
      callbacks: {
        jwt: async ({ token, user }:any) => {
          if (user) {
            token.id = user.id
            token.name = user.name
            token.lname = user.lname
            token.role = user.role
            token.admin = user.admin

            console.log("dsadasdas",user)
          }
          return token
        },
        session: async ({ session, token }:any) => {
  
            console.log(session.user)

            session.user.id = token.id
            session.user.name = token.name
            session.user.lname = token.lname
            session.user.role = token.role
            session.user.admin = token.admin

   
          return session
        },

        

        // async redirect({ url, baseUrl, session }:any) {
        //   if (session && session.user) {
        //     if (session.user.role === 'student') {
        //       return `${baseUrl}/history`;
        //     } else {
        //       return baseUrl;
        //     }
        //   }
        //   return baseUrl;
        // },

        // async signIn({user, account, profile}:any) {
        //   const isAllowedToSignIn = true
        //   if (isAllowedToSignIn) {
        //     return true
        //   } else {
        //     // Return false to display a default error message
        //     return '/google'
        //     // Or you can return a URL to redirect to:
        //     // return '/unauthorized'
        //   }
        // }


        // async redirect({ url, baseUrl ,session }:any) {
        //   if (session && session.user) {
        //     if (session.user.admin === false) {
        //       if (session.user.role === 'student') {
        //         return `${baseUrl}/history`;
        //       } else if (session.user.role === 'teacher') {
        //         return `${baseUrl}/teachermanageroom`;
        //       } else if (session.user.role === 'officer') {
        //         return `${baseUrl}/history`;
        //       }
        //     } else {
        //       return `${baseUrl}/manageuser`;
        //     }
        //   }
        //   return baseUrl;
        // }
        




      },
      pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
      },
      
    

})

export { handler as GET, handler as POST }