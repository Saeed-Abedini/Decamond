"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button/Button";
import styles from "./page.module.scss";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    setIsLoggingOut(true);

    startTransition(() => {
      logout();
      router.push("/auth");
    });
  };

  // Show loading while checking authentication
  if (isLoading || isPending) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated after loading, show nothing (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.backgroundShapes}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
          <div className={styles.shape3}></div>
          <div className={styles.shape4}></div>
        </div>
      </div>

      <div className={styles.dashboard}>
        <header className={styles.header}>
          <div className={styles.welcomeSection}>
            <div className={styles.brandSection}>
              <div className={styles.logo}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 6L5.5 7.5L7 8L5.5 8.5L5 10L4.5 8.5L3 8L4.5 7.5L5 6Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className={styles.title}>Welcome to Dashboard</h1>
            </div>

            {user && !isLoggingOut && (
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <img
                    src={user.picture.medium}
                    alt={`${user.name.first} ${user.name.last}`}
                    className={styles.avatarImage}
                  />
                </div>
                <div className={styles.userDetails}>
                  <h2 className={styles.userName}>
                    {user.name.first} {user.name.last}
                  </h2>
                  <p className={styles.userEmail}>{user.email}</p>
                  <p className={styles.userLocation}>
                    {user.location.city}, {user.location.country}
                  </p>
                </div>
              </div>
            )}

            {isLoggingOut && (
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <div className={styles.avatarPlaceholder}>
                    <div className={styles.spinner}></div>
                  </div>
                </div>
                <div className={styles.userDetails}>
                  <h2 className={styles.userName}>Signing Out...</h2>
                  <p className={styles.userEmail}>Please wait</p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.headerActions}>
            <Button
              variant="outline"
              size="medium"
              onClick={handleLogout}
              className={styles.logoutButton}
              disabled={isPending || isLoggingOut}
            >
              {isPending || isLoggingOut ? "Signing Out..." : "Sign Out"}
            </Button>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>User Information</h3>
                <div className={styles.cardBadge}>
                  <span className={styles.badgeText}>Active</span>
                </div>
              </div>

              {user && !isLoggingOut && (
                <div className={styles.userStats}>
                  <div className={styles.stat}>
                    <div className={styles.statIcon}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>Full Name</span>
                      <span className={styles.statValue}>
                        {user.name.title} {user.name.first} {user.name.last}
                      </span>
                    </div>
                  </div>

                  <div className={styles.stat}>
                    <div className={styles.statIcon}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>Email Address</span>
                      <span className={styles.statValue}>{user.email}</span>
                    </div>
                  </div>

                  <div className={styles.stat}>
                    <div className={styles.statIcon}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>Phone Number</span>
                      <span className={styles.statValue}>{user.phone}</span>
                    </div>
                  </div>

                  <div className={styles.stat}>
                    <div className={styles.statIcon}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>Age</span>
                      <span className={styles.statValue}>
                        {user.dob.age} years old
                      </span>
                    </div>
                  </div>

                  <div className={styles.stat}>
                    <div className={styles.statIcon}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>Address</span>
                      <span className={styles.statValue}>
                        {user.location.street.number}{" "}
                        {user.location.street.name}, {user.location.city}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {isLoggingOut && (
                <div className={styles.loadingStats}>
                  <div className={styles.stat}>
                    <div className={styles.statIcon}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>Status</span>
                      <span className={styles.statValue}>
                        Signing out of system...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
