import { gql } from "@apollo/client";
import createApolloClient from "../../apollo-client";

export async function getStaticProps() {
    const client = createApolloClient();
    const { data } = await client.query({
        query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
    });

    return {
        props: {
            countries: data.countries.slice(0, 4),
        },
    };
}

export function test() {
    <div>
        {
            <Menu as="div" className="relative inline-block text-left ">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-0.5 hover:text-[#c2cc33]">
                <span className="font-semibold">Projects</span><sub className="Dev text-xs text-red-600 mt-1">dev</sub>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white/10 backdrop-blur-md shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="/Pages/on_dev/frm_val_crud/career"
                    className="block px-4 py-2 data-focus:bg-gray-100  data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Career
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="/Pages/on_dev/frm_val_crud/employer"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Employer
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="/Pages/on_dev/country_api"
                    className="block px-4 py-2 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    GraphQL
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        }
    </div>
}


export default function Home({ countries }) {
    <div className={styles.grid}>
        {countries.map((country) => (
            <div key={country.code} className={styles.card}>
                <h3>{country.name}</h3>
                <p>
                    {country.code} - {country.emoji}
                </p>
            </div>
        ))}
    </div>
}