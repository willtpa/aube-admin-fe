<header>
    <nav class="navbar bg-base-100 border-b border-neutral">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="-1" role="button" class="btn btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16"
                        />
                    </svg>
                </div>
                <ul
                    tabindex="-1"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                    <li>
                        <a class="link link-hover" href="/accounts">Accounts</a>
                    </li>
                    <li>
                        <div class="link link-hover">Compliance</div>
                        <ul class="p-2">
                            <li>
                                <a class="link link-hover" href="/compliance/legal-entities">
                                    Legal Entities
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a class="link link-hover" href="/rates">Rates</a>
                    </li>
                </ul>
            </div>
            <a href="/">
                <img src="/logo-white.svg" alt="Triple-A Logo" class="max-h-10 m-5" />
            </a>
        </div>
        <div class="navbar-end hidden lg:flex">
            <ul class="menu menu-horizontal px-1 my-0">
                <li>
                    <a class="link link-hover" href="/accounts">Accounts</a>
                </li>
                <li>
                    <details>
                        <summary>Compliance</summary>
                        <ul class="p-2">
                            <li>
                                <a class="link link-hover" href="/compliance/legal-entities">
                                    Legal Entities
                                </a>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <a class="link link-hover" href="/rates">Rates</a>
                </li>
            </ul>
        </div>
    </nav>
</header>
